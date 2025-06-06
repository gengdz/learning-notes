/* eslint-disable no-case-declarations */
import {
  ClassComponent,
  ConcurrentMode,
  Fiber,
  FunctionComponent,
  HostComponent,
  HostRoot,
  HostText,
  includesSomeLane,
  NoLane,
  NoLanes,
} from './constants';
import { createFiberFromElement, createWorkInProgress } from './fiber';
import { createElement, appendChildren, setInitialProps } from './dom';

let workInProgress = null;

let renderLanes = NoLanes;

// 复用子节点
function bailout(current, workInProgress) {
  let currentChild = current.child;
  if (currentChild === null) {
    return null;
  }

  let result = null;
  let prevChild = null;

  while (currentChild) {
    const newChild = createWorkInProgress(
      currentChild,
      currentChild.memoizedProps,
    );
    newChild.return = workInProgress;
    if (result === null) {
      result = newChild;
      workInProgress.child = result;
    } else {
      prevChild.sibling = newChild;
    }
    prevChild = newChild;
    currentChild = currentChild.sibling;
  }
  return result;
}

function beginWork(current: Fiber, workInProgress: Fiber) {
  if (current) {
    if (
      current.memoizedProps === workInProgress.pendingProps &&
      !includesSomeLane(workInProgress.lanes, renderLanes)
    ) {
      if (!includesSomeLane(workInProgress.childLanes, renderLanes)) {
        return null;
      }
      return bailout(current, workInProgress);
    }
  }
  // 1. 处理 alternate
  let nextChildren;

  switch (workInProgress.tag) {
    case HostRoot:
      nextChildren = workInProgress.updateQueue.pending.payload;
      workInProgress.updateQueue.pending = null;
      break;
    case HostComponent:
      const children = workInProgress.pendingProps.children;
      nextChildren = ['string', 'number'].includes(typeof children)
        ? null
        : children;
      break;
    case FunctionComponent:
      nextChildren = workInProgress.type(workInProgress.pendingProps);
      break;
    case ClassComponent:
      if (!current) {
        const instance = new workInProgress.type(workInProgress.pendingProps);
        instance._reactFiber = workInProgress;
        workInProgress.stateNode = instance;
        nextChildren = instance.render();
      } else {
        const instance = workInProgress.stateNode;
        let newState = instance.state;
        const pendingState = current.updateQueue.pending;
        let next = pendingState.next;

        do {
          newState = { ...newState, ...next.payload };
          if (next === pendingState) {
            break;
          }
          next = next.next;
        } while (next);
        instance.state = newState;
        nextChildren = instance.render();
      }
      break;
    default:
      return;
  }

  if (!nextChildren) {
    workInProgress.child = null;
    return workInProgress.child;
  }

  // 重新构建子Fiber，清除自身标记
  workInProgress.lanes = NoLane;
  const childFiber = createFiberFromElement(
    nextChildren,
    ConcurrentMode,
    NoLanes,
  );
  childFiber.return = workInProgress;
  childFiber.child = childFiber;
  // workInProgress.alternate = childFiber;

  // 2. 找到 子Fiber
  return workInProgress.child;
}

function completeWork(workInProgress: Fiber) {
  // 完善Fiber 属性，比如 DOM 属性、收集副作用属性。

  switch (workInProgress.tag) {
    case HostRoot:
    case FunctionComponent:
    case ClassComponent:
      break;
    case HostComponent:
      const instance = createElement(workInProgress);
      appendChildren(instance, workInProgress);
      workInProgress.stateNode = instance;
      instance.internalFiber = workInProgress;
      setInitialProps(instance, workInProgress.pendingProps);
      break;
    case HostText:
      workInProgress.stateNode = document.createTextNode(
        workInProgress.pendingProps,
      );
      break;

    default:
      return;
  }
  workInProgress.childLanes = NoLane;
}

function renderRootSync() {
  while (workInProgress) {
    const current = workInProgress.alternate;
    const next = beginWork(current, workInProgress);
    workInProgress.memoizedProps = workInProgress.pendingProps;

    if (next) {
      workInProgress = next;
    } else {
      do {
        completeWork(workInProgress);
        if (workInProgress.sibling) {
          workInProgress = workInProgress.sibling;
        } else {
          workInProgress = workInProgress.return;
        }
      } while (workInProgress);
    }
  }
}

function commitRoot(root) {
  root.pendingLanes = NoLanes;
  root.callbackPriority = NoLanes;
  const container = root.container;
  const finishedWork = root.current.alternate;
  let childFiber = finishedWork.child;

  while (childFiber) {
    if (childFiber.tag === HostComponent && childFiber.stateNode) {
      if (container.childNodes[0]) {
        container.childNodes[0].remove();
      }
      container.appendChild(childFiber.stateNode);
      break;
    }
    childFiber = childFiber.child;
  }
  root.current = finishedWork;
}

function prepareFresh(root) {
  workInProgress = createWorkInProgress(root.current, null);
  renderLanes = root.pendingLanes;
}

export default function renderSync(root, children) {
  // 初始化
  prepareFresh(root);

  // render
  renderRootSync();

  // commit
  commitRoot(root);
}

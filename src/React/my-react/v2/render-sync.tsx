/* eslint-disable no-case-declarations */
import {
  ClassComponent,
  ConcurrentMode,
  Fiber,
  FunctionComponent,
  HostComponent,
  HostRoot,
  HostText,
  NoLanes,
} from './constants';
import { createFiberFromElement, createWorkInProgress } from './fiber';
import { createElement, appendChildren, setInitialProps } from './dom';

let workInProgress = null;

function beginWork(workInProgress: Fiber) {
  // 1. 处理 alternate
  let nextChildren;

  switch (workInProgress.tag) {
    case HostRoot:
      nextChildren = workInProgress.pendingProps.children;
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
      const instance = new workInProgress.type(workInProgress.pendingProps);
      instance._reactFiber = workInProgress;
      nextChildren = instance.render();
      break;
    default:
      return;
  }

  if (!nextChildren) {
    workInProgress.child = null;
    return workInProgress.child;
  }
  const childFiber = createFiberFromElement(
    nextChildren,
    ConcurrentMode,
    NoLanes,
  );
  childFiber.return = workInProgress;
  workInProgress.alternate = childFiber;

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
}

function renderRootSync() {
  while (workInProgress) {
    const next = beginWork(workInProgress);
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
  const container = root.container;
  const finishedWork = root.current.alternate;
  let childFiber = finishedWork.child;

  while (childFiber) {
    if (childFiber.tag === HostComponent && childFiber.stateNode) {
      container.appendChild(childFiber.stateNode);
      break;
    }
    childFiber = childFiber.child;
  }
  root.current = finishedWork;
}

function prepareFresh(root, children) {
  workInProgress = createWorkInProgress(root.current, null);
  // renderLanes = root.pendingLanes;
}

export default function renderSync(root, children) {
  // 初始化
  prepareFresh(root, children);

  // render
  renderRootSync();

  // commit
  commitRoot(root);
}

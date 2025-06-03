/* eslint-disable no-case-declarations */
import React from './createElement';
import {
  ClassComponent,
  ConcurrentMode,
  ConcurrentRoot,
  Fiber,
  FunctionComponent,
  HostComponent,
  HostRoot,
  HostText,
  NoLanes,
} from './constants';
import {
  createFiberFromElement,
  createHostRootFiber,
  createWorkInProgress,
} from './fiber';

const element = (
  <div title="title">
    <h1>i am h1</h1>
  </div>
);

function App() {
  return <div style={{ color: 'green' }}>i am function component</div>;
}

class ClassApp extends React.Component {
  render() {
    return <div style={{ color: 'blue' }}>i am class component</div>;
  }
}

const root = {
  container: document.getElementById('root'),
  current: null as unknown as Fiber,
};
const hostRootFiber = createHostRootFiber(ConcurrentRoot, true);
root.current = hostRootFiber;
hostRootFiber.stateNode = root;

let workInProgress = createWorkInProgress(hostRootFiber, {
  children: element,
  // children: <App/>,
  // children: <App/>,
});

function createElement(workInProgress: Fiber) {
  return document.createElement(workInProgress.type);
}

function appendChildren(dom: any, workInProgress: Fiber) {
  // 将当前所有的子节点的 node 挂载到现在生成的 dom 上
  let childFiber = workInProgress.child;
  while (childFiber) {
    dom.appendChild(childFiber.stateNode);
    childFiber = childFiber.sibling;
  }
}

function setInitialProps(dom: HTMLHtmlElement, nextProps) {
  for (const [k, v] of Object.entries(nextProps)) {
    if (k === 'style') {
      for (const [sk, sv] of Object.entries(v)) {
        dom.style[sk] = sv;
      }
      continue;
    }
    if (k === 'children') {
      if (['string', 'number'].includes(typeof v)) {
        dom.textContent = v as any;
      }

      continue;
    }

    dom[k] = v;
  }
}

function beginWork(workInProgress: Fiber) {
  // 处理 alternate
  let nextChildren: Fiber;

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

  // 找到 子Fiber
  return workInProgress.child;
}

function completeWork(workInProgress: Fiber) {
  // 完善Fiber 属性，比如 DOM 属性，收集副作用属性。

  switch (workInProgress.tag) {
    case HostRoot:
    case HostComponent:
      const instance = createElement(workInProgress);
      appendChildren(instance, workInProgress);
      workInProgress.stateNode = instance;
      setInitialProps(instance, workInProgress.pendingProps);
      break;
    case HostText:
      workInProgress.stateNode = document.createTextNode(
        workInProgress.pendingProps,
      );
      break;

    case FunctionComponent:
      break;
    case ClassComponent:
      break;
    default:
      return;
  }
}

function renderRootSync() {
  while (workInProgress) {
    const next = beginWork(workInProgress);

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

function commitRoot() {
  const container = root.container;
  const finishedWork = root.current.alternate;
  let childFiber = finishedWork.child;

  while (childFiber) {
    if (childFiber.tag === HostComponent && childFiber.stateNode) {
      container.appendChild(childFiber.stateNode);
      break;
    }
    childFiber = childFiber.return;
  }
  root.current = finishedWork;
}

function render() {
  // render
  renderRootSync();

  // commit
  commitRoot();
}

render();

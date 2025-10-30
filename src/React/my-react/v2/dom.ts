import { Fiber } from './constants';

export function createElement(workInProgress: Fiber) {
  return document.createElement(workInProgress.type);
}

export function appendChildren(dom: any, workInProgress: Fiber) {
  // 将当前所有的子节点的 node 挂载到现在生成的 dom 上
  let childFiber = workInProgress.child;
  while (childFiber) {
    dom.appendChild(childFiber.stateNode);
    childFiber = childFiber.sibling;
  }
}

export function setInitialProps(dom: HTMLHtmlElement, nextProps) {
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

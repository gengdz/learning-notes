import { Fiber, HostComponent } from './constants';
import { flush } from './sedule-sync-callback';

const allEvents = ['click'];

function accumulateListeners(reactName: string, fiber: Fiber) {
  const listeners = [];
  let currentFiber = fiber;

  while (currentFiber) {
    if (currentFiber.tag === HostComponent && currentFiber.stateNode) {
      const listener = currentFiber.memoizedProps[reactName];
      if (listener) {
        listeners.push(listener);
      }
    }
    currentFiber = currentFiber.return;
  }
  return listeners;
}

class SyntheticEvent {
  nativeEvent: any;
  constructor(event) {
    this.nativeEvent = event;
    Object.keys(event).forEach((key) => {
      if (key === 'preventDefault') {
        this[key] = function () {};
      } else if (key === 'stopPropagation') {
        this[key] = function () {};
      } else {
        this[key] = event[key];
      }
    });
  }
}

function dispatchEvent(event) {
  const { type, target } = event;
  const reactName = 'on' + type[0].toUpperCase() + type.slice(1);

  // 1. 收集函数
  const listeners = accumulateListeners(reactName, target.internalFiber);

  // 2. 合成事件
  const syntheticEvent = new SyntheticEvent(event);

  // 3. 执行
  listeners.forEach((listener) => {
    listener(syntheticEvent);
  });
}

export default function listenToAllEvents(container) {
  allEvents.forEach((event) => {
    container.addEventListener(
      event,
      (e) => {
        flush(() => dispatchEvent(e));
      },
      false,
    );
  });
}

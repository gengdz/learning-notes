import {
  ClassComponent,
  ConcurrentMode,
  ConcurrentRoot,
  Fiber,
  FunctionComponent,
  HostComponent,
  HostRoot,
  HostText,
  Lanes,
  NoFlags,
  NoLanes,
  NoMode,
  ReactElement,
} from './constants';

// https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiber.js#L231-L231
export function FiberNode(tag, pendingProps, key, mode) {
  // Instance
  this.tag = tag;
  this.key = key;
  this.elementType = null;
  this.type = null;
  this.stateNode = null;

  // Fiber
  this.return = null;
  this.child = null;
  this.sibling = null;
  this.index = 0;

  this.ref = null;
  this.refCleanup = null;

  this.pendingProps = pendingProps;
  this.memoizedProps = null;
  this.updateQueue = {
    pending: null,
  };
  this.memoizedState = null;
  this.dependencies = null;

  this.mode = mode;

  // Effects
  this.flags = NoFlags;
  this.subtreeFlags = NoFlags;
  this.deletions = null;

  this.lanes = NoLanes;
  this.childLanes = NoLanes;

  this.alternate = null;
}

export function createFiber(tag, pendingProps, key, mode): Fiber {
  return new FiberNode(tag, pendingProps, key, mode);
}

export function createFiberFromElement(element: ReactElement, mode, lanes) {
  let tag = null;
  const type = element.type;
  const key = element.key;
  const pendingProps = element.props;
  if (typeof type === 'string') {
    tag = HostComponent;
  } else if (typeof type === 'function') {
    if (type.isReactComponent) {
      tag = ClassComponent;
    } else {
      tag = FunctionComponent;
    }
  }

  const fiber = createFiber(tag, pendingProps, key, mode);
  fiber.type = type;
  fiber.lanes = lanes;
  return fiber;
}

export function createFiberFromText(content, mode, lanes: Lanes) {
  const fiber = createFiber(HostText, content, null, mode);
  fiber.lanes = lanes;
  return fiber;
}

export function createHostRootFiber(tag, isStrictMode) {
  let mode;
  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode;
  } else {
    mode = NoMode;
  }
  return createFiber(HostRoot, null, null, mode);
}

export function createWorkInProgress(current: Fiber, pendingProps) {
  let workInProgress = current.alternate;

  if (workInProgress === null) {
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode,
    );
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.type = current.type;

    workInProgress.flags = NoFlags;
    workInProgress.subtreeFlags = NoFlags;
    workInProgress.deletions = null;
  }

  workInProgress.child = current.child;

  return workInProgress;
}

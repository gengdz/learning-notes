import {
  Fiber,
  ReactElement,
  Placement,
  ChildDeletion,
  NoLanes,
  HostText,
} from './constants';
import {
  createFiberFromElement,
  createFiberFromText,
  createWorkInProgress,
} from './fiber';

let shouldTrackSideEffects = false;

// ---- 工具函数 ----

// 给 fiber 标记 Placement（需要插入 DOM）
function placeSingleChild(fiber: Fiber): Fiber {
  // 仅在更新阶段（shouldTrackSideEffects=true）且该 fiber 是新建的（没有 alternate）时标记
  if (shouldTrackSideEffects && fiber.alternate === null) {
    fiber.flags |= Placement;
  }
  return fiber;
}

// 把要删除的旧 fiber 记录到父 fiber 的 deletions 数组里
function deleteChild(returnFiber: Fiber, childToDelete: Fiber) {
  if (!shouldTrackSideEffects) return;
  if (returnFiber.deletions === null) {
    returnFiber.deletions = [childToDelete];
    returnFiber.flags |= ChildDeletion;
  } else {
    returnFiber.deletions.push(childToDelete);
  }
}

// 删除从 currentFirstChild 开始的所有旧兄弟节点
function deleteRemainingChildren(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
) {
  if (!shouldTrackSideEffects) return;
  let childToDelete = currentFirstChild;
  while (childToDelete !== null) {
    deleteChild(returnFiber, childToDelete);
    childToDelete = childToDelete.sibling;
  }
}

// 尝试复用旧 fiber：key 和 type 都相同才能复用
function useFiber(fiber: Fiber, pendingProps: any): Fiber {
  const clone = createWorkInProgress(fiber, pendingProps);
  clone.index = 0;
  clone.sibling = null;
  return clone;
}

// ---- 单节点 diff ----
// nextChildren 是单个 ReactElement 的情况
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement,
): Fiber {
  const key = element.key;
  let child = currentFirstChild;

  // 遍历旧的兄弟链表，尝试找到可以复用的节点
  while (child !== null) {
    if (child.key === key) {
      // key 相同，再看 type
      if (child.type === element.type) {
        // type 也相同 → 可以复用，删掉剩余的旧兄弟
        deleteRemainingChildren(returnFiber, child.sibling);
        const existing = useFiber(child, element.props);
        existing.return = returnFiber;
        return existing;
      }
      // key 相同但 type 不同 → 不可能再有可复用的了，全部删掉
      deleteRemainingChildren(returnFiber, child);
      break;
    } else {
      // key 不同，删掉这个旧节点，继续看下一个兄弟
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }

  // 没有可复用的 → 新建 fiber
  const created = createFiberFromElement(element, returnFiber.mode, NoLanes);
  created.return = returnFiber;
  return created;
}

// ---- 单文本节点 diff ----
function reconcileSingleTextNode(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  textContent: string,
): Fiber {
  // 如果旧的第一个子节点就是文本节点，直接复用
  if (currentFirstChild !== null && currentFirstChild.tag === HostText) {
    deleteRemainingChildren(returnFiber, currentFirstChild.sibling);
    const existing = useFiber(currentFirstChild, textContent);
    existing.return = returnFiber;
    return existing;
  }

  // 否则删掉所有旧节点，新建文本 fiber
  deleteRemainingChildren(returnFiber, currentFirstChild);
  const created = createFiberFromText(textContent, returnFiber.mode, NoLanes);
  created.return = returnFiber;
  return created;
}

// ---- 多节点 diff (数组) ----
// 简化版：不做 key map 优化，只做线性对比
function reconcileChildrenArray(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChildren: ReactElement[],
): Fiber | null {
  let resultingFirstChild: Fiber | null = null; // 最终返回的第一个子 fiber
  let previousNewFiber: Fiber | null = null; // 用于串联 sibling
  let oldFiber: Fiber | null = currentFirstChild;
  let newIdx = 0;

  // 第一轮：同位置对比，尽可能复用
  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    const newChild = newChildren[newIdx];
    let newFiber: Fiber | null = null;

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      // 文本节点
      if (oldFiber.tag === HostText) {
        newFiber = useFiber(oldFiber, '' + newChild);
      } else {
        deleteChild(returnFiber, oldFiber);
        newFiber = createFiberFromText(
          '' + newChild,
          returnFiber.mode,
          NoLanes,
        );
      }
    } else if (typeof newChild === 'object' && newChild !== null) {
      // ReactElement
      if (oldFiber.key === newChild.key && oldFiber.type === newChild.type) {
        // 可以复用
        newFiber = useFiber(oldFiber, newChild.props);
        newFiber.type = newChild.type;
      } else {
        // 不可复用，跳出第一轮
        break;
      }
    }

    if (newFiber) {
      newFiber.return = returnFiber;
      newFiber.index = newIdx;
      if (shouldTrackSideEffects && newFiber.alternate === null) {
        newFiber.flags |= Placement;
      }
    }

    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
    oldFiber = oldFiber.sibling;
  }

  // 如果新 children 已经遍历完，删掉剩余的旧 fiber
  if (newIdx === newChildren.length) {
    deleteRemainingChildren(returnFiber, oldFiber);
    return resultingFirstChild;
  }

  // 如果旧 fiber 已经用完，剩下的新 children 都是新建
  for (; newIdx < newChildren.length; newIdx++) {
    const newChild = newChildren[newIdx];
    let newFiber: Fiber | null = null;

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      newFiber = createFiberFromText('' + newChild, returnFiber.mode, NoLanes);
    } else if (typeof newChild === 'object' && newChild !== null) {
      newFiber = createFiberFromElement(newChild, returnFiber.mode, NoLanes);
    }

    if (newFiber) {
      newFiber.return = returnFiber;
      newFiber.index = newIdx;
      if (shouldTrackSideEffects) {
        newFiber.flags |= Placement;
      }
    }

    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }

  return resultingFirstChild;
}

// ---- 入口 ----
// current: 当前页面上的 fiber（首次渲染时为 null）
// workInProgress: 正在构建的 fiber
// nextChildren: jsx 产生的新 ReactElement（可能是单个、数组、文本）
export default function reconciler(
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: ReactElement | ReactElement[] | string | number,
): Fiber | null {
  // 首次渲染时不需要追踪副作用（不需要标记 Placement / Deletion）
  // 因为整棵树都是新的，commit 阶段会整体挂载
  shouldTrackSideEffects = current !== null && current.child !== null;

  const currentFirstChild = current ? current.child : null;

  // 文本节点
  if (typeof nextChildren === 'string' || typeof nextChildren === 'number') {
    return placeSingleChild(
      reconcileSingleTextNode(
        workInProgress,
        currentFirstChild,
        '' + nextChildren,
      ),
    );
  }

  // 数组（多个子元素）
  if (Array.isArray(nextChildren)) {
    return reconcileChildrenArray(
      workInProgress,
      currentFirstChild,
      nextChildren,
    );
  }

  // 单个 ReactElement
  if (typeof nextChildren === 'object' && nextChildren !== null) {
    return placeSingleChild(
      reconcileSingleElement(workInProgress, currentFirstChild, nextChildren),
    );
  }

  // null / undefined / boolean → 清空子节点
  deleteRemainingChildren(workInProgress, currentFirstChild);
  return null;
}

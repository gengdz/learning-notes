import { Fiber, mergeLanes, SyncLane } from './constants';
import renderSync from './render-sync';
import { scheduleSyncCallback } from './sedule-sync-callback';

export function enqueueUpdate(fiber: Fiber, update) {
  // 1. 链式存储。永远是更新链表中最后一个 update
  const pending = fiber.updateQueue.pending;

  if (!pending) {
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }
  fiber.updateQueue.pending = update;

  // 2. 标记
  fiber.lanes = mergeLanes(fiber.lanes, update.lane);

  // 2.1 向上遍历，直到顶部
  let node = fiber;
  let parent = fiber.return;

  while (parent) {
    parent.childLanes = mergeLanes(parent.childLanes, update.lane);
    node = parent;
    parent = parent.return;
  }

  // 3. 返回根 dom
  return node.stateNode;
}

function scheduleUpdate(root, lane) {
  // 全局记录保存所有执行的变更
  root.pendingLane |= lane;

  // 从当前的 pendingLane 中挑选出最高优先级的变更用于渲染
  const nextLane = lane;

  // 是否已生成了待执行的渲染
  const existingCallbackPriority = root.callbackPriority;

  // 存在渲染任务，则这次变更，将在这次的渲染任务中一并处理
  if (nextLane === existingCallbackPriority) {
    return;
  }

  // 生成一次渲染任务，并存储起来
  const newTask = renderSync.bind(null, root);
  // 如果是 creatRoot 方式创建的，那么我们可以生成一个微任务队列。
  scheduleSyncCallback(newTask);
  root.callbackPriority = lane;
}

export function classComponentUpdate(instance, partialState) {
  // 1. 生成一个变更
  const update = {
    payload: partialState,
    lane: SyncLane,
  };

  // 2. 挂载变更
  const fiber = instance._reactFiber;
  const root = enqueueUpdate(fiber, update);

  // 3. 调度
  scheduleUpdate(root, update.lane);
}

// 入口更新
export function updateContainer(root, element) {
  // 1. 生成一个变更
  const update = {
    payload: element,
    lane: SyncLane,
  };

  // 2. 挂载变更
  const fiber = root.current;
  const _root = enqueueUpdate(fiber, update);

  // 3. 调度
  scheduleUpdate(_root, update.lane);
}

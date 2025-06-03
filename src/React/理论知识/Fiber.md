# Fiber

## 为什么需要 Fiber

之前的方式存在的问题：在 React16 引入 Fiber 架构之前，React 会采用递归对比 DOM 树，找出需要变更的节点，然后同步更新它们，这个过程 React 称为：`reconcilation` （协调）。在 `reconcilation` 期间，React 会一直占用浏览器资源，会导致用户触发的事件得不到响应。

这种遍历是递归调用，执行栈会越来越深，而且不能中断，中断后就不能恢复了。递归如果非常深，就会十分卡顿。
如果递归花了 100 ms，则这 100ms 浏览器是无法响应的，代码执行时间越长，卡顿越明显。传统的方法存在不能中断和执行栈太深的问题

为了解决以上的痛点问题，React 引入了 Fiber 来改变这种不可控的现状。

把渲染/更新过程拆分为一个个小块的任务，通过合理的调度机制来调控时间，指定任务执行的时机，从而降低页面卡顿的概率，提升页面交互体验。通过 Fiber 架构，让 `reconcilation` 过程变得可被中断。适当让出 CPU 执行权，可以让浏览器及时地响应用户的交互。

## 什么是 Fiber

Fiber 可以理解为是一个执行单元，也可以理解为是一种数据结构。

### 一个执行单位

Fiber 可以理解为一个执行单元，每次执行完一个执行单元，React 就会检查现在还剩下多少时间，如果没有时间就会把控制权让出去。
如果还有空闲时间，会去判断是否存在待执行任务，不存在就直接将控制权交给浏览器，如果存在就会执行对应的任务，一直这么循环

Fiber 可以理解为划分一个个更小的执行单元，把一个大任务划分为为很多小块任务，一个小块的任务的执行是一次完成不能出现暂停，但是一小块任务执行完后可以转移控制权给浏览器。

### 一种数据结构

Fiber 还可以理解为是一种数据结构，React Fiber 就是采用链表实现的。每个 Virtual DOM 都可以表示为一个 Fiber。

大概分为以下几类

- 元素类型 tag, key, elementType, type,
- 链表属性 return, child, sibling, index
- 状态属性 stateNode, pendingProps, memoizedProps, updateQueue, memoizedState,
- 标识位 flags, subtreeFlags, lanes, childLanes,
- 其他属性 mode, deletions, alternate

```typescript

// 详情见
// https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactInternalTypes.js#L88-L88

// 主要包括 23 个属性 + 性能字段 + 开发调试字段
export type Fiber = {
  // 标识 Fiber 类型
  //如 FunctionComponent = 0 、ClassComponent = 1、HostRoot = 3 、HostPortal = 4、 HostComponent = 5 (原生 DOM 元素，如 div） 等
  tag: WorkTag,

  // 唯一 key，用于区分同级元素
  key: null | string,

  // 原始组件类型
  // 当组件被高阶组件（HOC）包装时，elementType 会保留 原始组件，而 type 可能指向包装后的对象。
  elementType: any,

  // 组件的类型
  // 元素的类型（比如函数组件本身、class 构造函数等）
  // 函数组件：type 是该函数（如 function Button() {}）。
  // 类组件：type 是该类的构造函数（如 class Button extends React.Component）。
  // 原生 DOM 元素：type 是字符串标签名（如 'div'）。
  // 特殊组件：如 React.Fragment 的 type 是 Symbol(React.Fragment)
  type: any,

  // 该节点本地的状态（比如 class 组件实例，或 DOM 节点等）
  stateNode: any,

  // 指向父节点
  return: Fiber | null,

  // 指向第一个子 Fiber
  child: Fiber | null,

  // 指向下一个兄弟 Fiber
  sibling: Fiber | null,

  // 当前节点在兄弟节点中的索引
  index: number,

  // ref 属性相关
  ref: null | (((handle: mixed) => void) & {_stringRef: ?string, ...}) | RefObject,

  // ref 的清理函数
  refCleanup: null | (() => void),

  // 新的 props
  pendingProps: any,

  // 用于生成输出的 props
  memoizedProps: any,

  // 状态更新队列
  updateQueue: mixed,

  // 用于生成输出的 state
  memoizedState: any,

  // 上下文依赖等
  dependencies: Dependencies | null,

  // Fiber 的模式标志（如 ConcurrentMode 等）
  mode: TypeOfMode,

  // 副作用标志位
  flags: Flags, // 0b0000000000000000000000000000000; 0b0000000000000000000000000000001;
  subtreeFlags: Flags,
  deletions: Array<Fiber> | null,

  // 优先级相关
  lanes: Lanes, // 0b0000000000000000000000000000000
  childLanes: Lanes,

  // 指向“当前”或“工作中”的另一个 Fiber，用于双缓存
  // 图像在渲染的过程中用到的一种优化手段，为了减少在渲染过程中出现的闪烁、抖动的问题，设置了一个缓冲区，在渲染下一帧的时候，现在内存中准备好，然后一次性 commit 到显示器上，而不是一点点的区绘制

  // React 是有 2 棵 Fiber 树，一颗是当前页面显示的 Fiber 树，另一颗是 在内存中构建的 Fiber 树
  // 这两棵树对应的节点都有一个 alternate 属性，相互指向对方

  // 主要是为了节点的复用，减少垃圾回收，减少内存消耗
  alternate: Fiber | null,

  // 以下是 Profile 相关字段
  actualDuration?: number,
  actualStartTime?: number,
  selfBaseDuration?: number,
  treeBaseDuration?: number,

  // 调试相关字段（仅开发环境）
  _debugInfo?: ReactDebugInfo | null,
  _debugOwner?: ReactComponentInfo | Fiber | null,
  _debugStack?: string | Error | null,
  _debugTask?: ConsoleTask | null,
  _debugNeedsRemount?: boolean,
  _debugHookTypes?: Array<HookType> | null,
};

```

## Fiber 执行原理

从根节点开始渲染和调度的过程可以分为两个阶段：render 阶段、commit 阶段。

render 阶段：这个阶段是可中断的，会找出所有节点的变更

commit 阶段：这个阶段是不可中断的，会执行所有的变更

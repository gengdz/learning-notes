# Fiber

## 为什么需要 Fiber

在 React 16 之前，React 的协调过程是采用同步递归遍历虚拟 DOM 树。也就是说，一旦开始更新组件树，就会一直执行到结束，中间很难暂停。

当组件树较大或者更新计算较重时，这种方式会长时间占用主线程，导致浏览器不能及时响应用户输入、点击、滚动等操作，从而出现卡顿。

因此 React 引入 Fiber，目的是把原本一次性执行的大任务拆分成多个小任务，并通过调度机制控制这些任务的执行时机，从而让更新过程具备：

- 可中断
- 可恢复
- 可按优先级执行

这也是 React 后续并发能力的基础。

## 什么是 Fiber

Fiber 可以理解为是一个执行单元，也可以理解为是一种数据结构。

### 一个执行单位

React 会把一次大的渲染/更新任务拆分成很多小的工作单元。每处理完一个单元，React 都可以检查当前是否应该继续执行：

- 如果主线程还有空闲时间，则继续处理后续任务
- 如果需要响应更高优先级任务，则暂停当前工作并把控制权交还给浏览器

因此 Fiber 让 render 阶段具备了更灵活的调度能力。

> React 早期曾参考 requestIdleCallback 的思想，但由于其兼容性和触发时机不够稳定，最终通过 MessageChannel 等机制实现了自己的 Scheduler，以获得更可控的任务切片和优先级调度能力。

### 一种数据结构

Fiber 还可以理解为是一种数据结构，Fiber 是 React 在运行时维护的节点对象。React 会在协调过程中为每个元素创建或复用对应的 Fiber 节点，节点中保存了：

- 组件类型
- key
- props
- state
- 对应的 DOM/实例引用
- 父子兄弟关系
- 副作用标记
- 优先级信息

Fiber 树本质上仍然是一棵树，但节点之间通过以下指针形成链表化表示：

- child：第一个子节点
- sibling：下一个兄弟节点
- return：父节点

这种结构使 React 不再依赖递归调用栈保存遍历上下文，从而支持渲染过程的暂停与恢复。

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

### 双缓冲（Double Buffering）

React 同时维护两棵 Fiber 树：

- current tree：当前已经渲染到屏幕上的树
- workInProgress tree：本次更新过程中在内存中构建的树

两棵树上的对应节点通过 alternate 相互指向。
当 render 阶段完成后，React 会在 commit 阶段把 workInProgress tree 切换为新的 current tree。

这种机制有两个重要作用：

- 避免中间状态直接暴露给用户
- 复用节点对象，减少内存分配和垃圾回收开销

## Fiber 执行原理

从根节点开始渲染和调度的过程可以分为两个阶段：render 阶段、commit 阶段。

### render 阶段

- 可中断
- 可恢复
- 可被高优先级任务打断

主要工作：

1. 从根节点开始深度优先遍历 Fiber 树
2. beginWork：向下遍历，根据新旧 props/state 对比，计算子节点，决定是否复用 Fiber，并标记副作用打上 flags 标记（Placement/Update/Deletion 等）
3. completeWork：向上回溯，收集副作用，创建或更新 DOM 所需的数据，构建DOM实例（但不插入真实DOM）

这一阶段的主要目标是构建 workInProgress tree，并收集需要在 commit 阶段执行的副作用。

由于 render 阶段可能被打断、重试或重复执行，因此这一阶段必须是纯计算过程，不能执行副作用。

> 正因为 render 阶段可能被重复执行，React 将 componentWillMount、componentWillReceiveProps、componentWillUpdate 标记为 UNSAFE，并推荐使用 getDerivedStateFromProps 等纯函数替代。

### commit 阶段

- 不可中断
- 同步执行

主要工作：

1. Before mutation：执行 DOM 变更前的读取逻辑如： getSnapshotBeforeUpdate，
2. Mutation：操作真实 DOM（插入/更新/删除）
3. Layout：执行 useLayoutEffect、componentDidMount、componentDidUpdate
4. Passive Effects: 异步调度并执行 useEffect

commit 阶段之所以不能中断，是因为它会直接操作真实 DOM，必须保证视图更新的一致性。

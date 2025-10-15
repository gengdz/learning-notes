export type Flags = number;
export const Placement = /*                    */ 0b0000000000000000000000000000010;
export const ChildDeletion = /*                */ 0b0000000000000000000000000010000;
export type TypeOfMode = number;

type mixed = any;
export type WorkTag =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31;

export const ConcurrentRoot = 1;
export const LegacyRoot = 0;

export const NoMode = /*                         */ 0b0000000;
export const ConcurrentMode = /*                 */ 0b0000001;
export type Lane = number;
export type Lanes = number;
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000;
export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000;
export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000010;

export const NoFlags = /*                      */ 0b0000000000000000000000000000000;

export const FunctionComponent = 0;
export const ClassComponent = 1;
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
export const HostComponent = 5;
export const HostText = 6;

export type RefObject = any;
type ReactContext<T> = any;
export type ContextDependency<T> = {
  context: ReactContext<T>;
  next: ContextDependency<mixed> | null;
  memoizedValue: T;
};

export type Dependencies = {
  lanes: Lanes;
  firstContext: ContextDependency<mixed> | null;
};

export type Fiber = {
  // 标识 Fiber 类型
  //如 FunctionComponent = 0 、ClassComponent = 1、HostRoot = 3 、HostPortal = 4、 HostComponent = 5 (原生 DOM 元素，如 div） 等
  tag: WorkTag;

  // 唯一 key，用于区分同级元素
  key: null | string;

  // 原始组件类型
  // 当组件被高阶组件（HOC）包装时，elementType 会保留 原始组件，而 type 可能指向包装后的对象。
  elementType: any;

  // 组件的类型
  // 元素的类型（比如函数组件本身、class 构造函数等）
  // 函数组件：type 是该函数（如 function Button() {}）。
  // 类组件：type 是该类的构造函数（如 class Button extends React.Component）。
  // 原生 DOM 元素：type 是字符串标签名（如 'div'）。
  // 特殊组件：如 React.Fragment 的 type 是 Symbol(React.Fragment)
  type: any;

  // 该节点本地的状态（比如 class 组件实例，或 DOM 节点等）
  stateNode: any;

  // 指向父节点
  return: Fiber | null;

  // 指向第一个子 Fiber
  child: Fiber | null;

  // 指向下一个兄弟 Fiber
  sibling: Fiber | null;

  // 当前节点在兄弟节点中的索引
  index: number;

  // ref 属性相关
  ref: null | (((handle: mixed) => void) & { _stringRef?: string }) | RefObject;

  // ref 的清理函数
  refCleanup: null | (() => void);

  // 新的 props
  pendingProps: any;

  // 用于生成输出的 props
  memoizedProps: any;

  // 状态更新队列
  updateQueue: mixed;

  // 用于生成输出的 state
  memoizedState: any;

  // 上下文依赖等
  dependencies: Dependencies | null;

  // Fiber 的模式标志（如 ConcurrentMode 等）
  mode: TypeOfMode;

  // 副作用标志位
  flags: Flags; // 0b0000000000000000000000000000000; 0b0000000000000000000000000000001;
  subtreeFlags: Flags;
  deletions: Array<Fiber> | null;

  // 优先级相关
  lanes: Lanes; // 0b0000000000000000000000000000000
  childLanes: Lanes;

  // 指向“当前”或“工作中”的另一个 Fiber，用于双缓存
  // 图像在渲染的过程中用到的一种优化手段，为了减少在渲染过程中出现的闪烁、抖动的问题，设置了一个缓冲区，在渲染下一帧的时候，现在内存中准备好，然后一次性 commit 到显示器上，而不是一点点的区绘制

  // React 是有 2 棵 Fiber 树，一颗是当前页面显示的 Fiber 树，另一颗是 在内存中构建的 Fiber 树
  // 这两棵树对应的节点都有一个 alternate 属性，相互指向对方

  // 主要是为了节点的复用，减少垃圾回收，减少内存消耗
  alternate: Fiber | null;

  // 以下是 Profile 相关字段
  actualDuration?: number;
  actualStartTime?: number;
  selfBaseDuration?: number;
  treeBaseDuration?: number;
};

export type ReactElement = {
  // 用于标识这是一个 React 元素
  $$typeof: symbol;

  // 元素类型，可以是字符串（如 'div'），也可以是函数或类组件
  type: 'div' | any;

  // 元素的 key，用于同级元素区分
  key: null | string;

  // ref 引用
  // eslint-disable-next-line @typescript-eslint/ban-types
  ref?: null | Function | object;

  // props 属性对象
  props?: ReactElement & {
    children: ReactElement | ReactElement[] | string | number | null; // children 可以是单个元素、数组或文本
    // ...其它属性
  };

  // 其他内部字段
};

export function mergeLanes(a: Lanes | Lane, b: Lanes | Lane): Lanes {
  return a | b;
}

export function includesSomeLane(a, b) {
  return (a & b) !== NoLane;
}

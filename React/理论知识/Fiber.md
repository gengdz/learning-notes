# Fiber


## 为什么需要 Fiber
之前的方式存在的问题：
在 React16 引入 Fiber 架构之前，React 会采用递归对比 DOM 树，找出需要变更的节点，然后同步更新它们，这个过程 React 称为：`reconcilation` (协调)。在 `reconcilation` 期间，React 会一直占用浏览器资源，会导致用户触发的事件得不到响应。
这种遍历是递归调用，执行栈会越来越深，而且不能中断，中断后就不能恢复了。递归如果非常深，就会十分卡顿。如果递归花了 100 ms，则这 100ms 浏览器是无法响应的，代码执行时间越长，卡顿越明显。传统的方法存在不能中断和执行栈太深的问题

为了解决以上的痛点问题，React 引入了 Fiber 来改变这种不可控的现状。

把渲染/更新过程拆分为一个个小块的任务，通过合理的调度机制来调控时间，指定任务执行的时机，从而降低页面卡顿的概率，提升页面交互体验。通过 Fiber 架构，让 `reconcilation` 过程变得可被中断。适当让出 CPU 执行权，可以让浏览器及时地响应用户的交互。



## 什么是 Fiber
Fiber 可以理解为是一个执行单元，也可以理解为是一种数据结构。



### 一个执行单位
Fiber 可以理解为一个执行单元，每次执行完一个执行单元，React 就会检查现在还剩下多少时间，如果没有时间就会把控制权让出去。如果还有空闲时间，会去判断是否存在待执行任务，不存在就直接将控制权交给浏览器，如果存在就会执行对应的任务，一直这么循环

Fiber 可以理解为划分一个个更小的执行单元，把一个大任务划分为为很多小块任务，一个小块的任务的执行是一次完成不能出现暂停，但是一小块任务执行完后可以转移控制权给浏览器。


### 一种数据结构
Fiber 还可以理解为是一种数据结构，React Fiber 就是采用链表实现的。每个 Virtual DOM 都可以表示为一个 Fiber。

```js
Fiber = {
    // 标识 fiber 类型的标签，详情参看下述 WorkTag
    tag: WorkTag,

    // 唯一表标识符
    key: null ｜ string;

    // 指向父节点
    return: Fiber | null,

    // 指向子节点
    child: Fiber | null,

    // 指向兄弟节点
    sibling: Fiber | null,

    // 在开始执行时设置 props 值
    pendingProps: any,

    // 在结束时设置的 props 值
    memoizedProps: any,

    // 用于状态更新，回调函数，DOM更新的队列
    updateQueue: mixed,

    // 当前 state
    memoizedState: any,

    // Effect 类型，详情查看以下 effectTag
    effectTag: SideEffectTag,

    // effect 节点指针，指向下一个 effect
    nextEffect: Fiber | null,

    // effect list 是单向链表，第一个 effect
    firstEffect: Fiber | null,

    // effect list 是单向链表，最后一个 effect
    lastEffect: Fiber | null,

    // work 的过期时间，可用于标识一个 work 优先级顺序
    expirationTime: ExpirationTime,
};

```



## Fiber 执行原理
从根节点开始渲染和调度的过程可以分为两个阶段：render 阶段、commit 阶段。

render 阶段：这个阶段是可中断的，会找出所有节点的变更



commit 阶段：这个阶段是不可中断的，会执行所有的变更
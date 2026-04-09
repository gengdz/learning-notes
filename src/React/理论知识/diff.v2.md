# React Diff 算法

React Diff 是 React 在 render 阶段 用一套 O(n) 的启发式算法，去比较旧 Fiber 和新的 ReactElement，找出本次更新需要执行的变更，找出哪些节点可以复用，哪些需要新增、删除或移动

可以先用一句话概括：

**React Diff = 用旧 Fiber 和新的 ReactElement 进行比较，边比较边生成新的 Fiber，并把新增、删除、移动、更新等副作用记录到 flags 上，等待 commit 阶段统一执行。**

---

## 一、为什么需要 Diff

如果要精确求解两棵树的最小编辑距离，时间复杂度通常是 **O(n³)**，在 UI 渲染场景中成本太高。

因此 React 没有采用“最优 Diff”，而是采用了“足够快”的启发式算法，核心假设有两个：

1. **不同类型的节点，会生成不同的子树**
2. **同一层级的子节点，可以通过** `**key**` **标识稳定身份**

基于这两个假设，React 把复杂的树编辑问题简化为了同层节点之间的线性比较，从而把复杂度控制在 **O(n)**。

---

## 二、Diff 发生在什么时候

Diff 发生在 **render 阶段**，准确来说是在 `beginWork` 中协调子节点时发生的。

React 不是先构建一棵完整的新树，再和旧树整体比较，而是：

- 读取旧的 `current Fiber`
- 根据新的 ReactElement 创建或复用新的 Fiber
- 在创建新 Fiber 的过程中完成 Diff
- 同时收集副作用标记

所以更准确地说，React 做的不是传统意义上的“整树对比”，而是 **边生成边比较**。

---

## 三、Diff 比较的到底是什么

React Diff 比较的不是两棵真实 DOM 树，也不是简单地比较两棵 ReactElement 树。

更准确的说法是：

**React 会拿当前的 Fiber 节点（current）和本次 render 生成的新 ReactElement 做比较，并在此基础上构建新的 workInProgress Fiber。**

所以它的输入输出可以理解为：

```ts
current Fiber + new ReactElement
  =>
workInProgress Fiber + flags

```

其中：

- `current Fiber`：上一次已经提交到页面的旧节点
- `new ReactElement`：本次 render 返回的新节点描述
- `workInProgress Fiber`：本次 render 过程中生成的新 Fiber
- `flags`：记录本次更新需要在 commit 阶段执行的副作用

---

## 四、Diff 的结果是什么

Diff 的结果不是立刻操作 DOM，而是：

- 复用旧 Fiber
- 创建新 Fiber
- 标记待删除的 Fiber
- 给 Fiber 打上副作用标记

常见副作用包括：

- `Placement`：插入或移动
- `Update`：更新
- `Deletion` / `ChildDeletion`：删除

另外：

- `flags`：表示当前 Fiber 自己的副作用
- `subtreeFlags`：表示整棵子树上的副作用汇总

这些标记会在 render 阶段收集好，等到 commit 阶段统一执行。

---

## 五、React Diff 的核心规则

### 1. 只比较同层节点

React 不会跨层比较节点。  如果一个节点从这一层移动到另一层，React 不会尝试识别“跨层移动”，而是会认为：

**旧节点删除 + 新节点创建**

这也是 React 能把复杂度控制在 O(n) 的关键前提之一。

### 2. 类型不同，直接替换整棵子树

如果旧节点和新节点的 `type` 不同：

- 旧 Fiber 以及它的整棵子树都会被卸载
- 创建新的 Fiber 和新的子树

这里的 `type` 可以是：

- 原生 DOM 标签：如 `div`、`span`
- 函数组件
- 类组件
- `Fragment` 等特殊类型

### 3. 类型相同，尽量复用

如果 `type` 相同，React 会尽量复用当前 Fiber，并继续比较：

- `props`
- 子节点
- 是否需要更新

对于原生 DOM 节点，类型相同通常表示可以复用对应的 DOM 节点，再比较属性和 children。  对于组件节点，类型相同表示可以复用组件对应的 Fiber，再重新执行 render 得到新的子节点树。

---

## 六、单节点 Diff

如果当前节点下只有一个子节点，规则比较简单：

- `key` 相同且 `type` 相同：复用旧 Fiber
- `key` 不同或 `type` 不同：删除旧 Fiber，创建新 Fiber

例如：

```jsx
<div>{isLogin ? <User key="user" /> : <Login key="login" />}</div>
```

由于 `key` 和 `type` 都不同，React 会直接卸载旧子树并挂载新子树。

---

## 七、多子节点 Diff：React Diff 最核心的部分

当一个节点下有多个 children 时，React 会进入数组子节点的协调逻辑。  源码中这一部分的核心函数主要是：

- `reconcileChildren`
- `reconcileChildFibers`
- `reconcileChildrenArray`
- `updateSlot`
- `updateFromMap`
- `placeChild`
- `deleteChild`

整个过程可以分成两轮。

---

## 八、第一轮：从左到右顺序比较

React 会同时遍历：

- 旧 Fiber 的兄弟链表
- 新 children 数组

按顺序逐个比较当前这一位是否能复用。

复用条件通常是：

- `key` 相同
- `type` 相同

如果匹配成功：

- 复用旧 Fiber
- 创建新的 workInProgress Fiber
- 继续比较下一个位置

如果中途发现某一项不匹配，就退出第一轮，进入第二轮。

这样做的目的是为了优化最常见的场景：**列表前缀稳定，只在后面发生少量变化**。

例如：

```jsx
旧：[a, b, c]
新：[a, b, d]

```

前两个节点可以快速复用，到 `c` 和 `d` 不匹配时停止。

---

## 九、第二轮：把剩余旧节点放进 Map 再查找

一旦第一轮无法继续，React 会把剩余旧 Fiber 节点放入一个 Map 中：

- 如果节点有 `key`，就用 `key` 作为 Map 的键
- 如果没有 `key`，就退化为使用旧索引 `index`

然后继续遍历剩余的新 children：

- 如果能在 Map 中找到可复用节点，就复用它
- 如果找不到，就创建新 Fiber，并标记 `Placement`
- 遍历结束后，Map 中还剩下的旧 Fiber，统一标记删除

这一步解决的是：

- 节点插入
- 节点删除
- 节点重排

---

## 十、React 如何判断节点是否需要移动

React 并不会去求最小移动次数，它使用的是一种更高效的启发式策略：`lastPlacedIndex`。

### 基本思路

React 在遍历新 children 时，会记录一个当前“已经确认不需要移动”的最大旧索引：`lastPlacedIndex`。

对于每一个被复用的节点：

- 如果它在旧列表中的索引 **大于等于** `lastPlacedIndex`   说明它的相对顺序没有倒退，不需要移动
- 如果它在旧列表中的索引 **小于** `lastPlacedIndex`   说明它相对于前面的节点发生了倒退，需要移动，打上 `Placement`

### 例子

旧列表：

```jsx
[a, b, c, d];
```

新列表：

```jsx
[b, a, c, d];
```

遍历新列表时：

1. `b` 在旧列表中的索引是 1，更新 `lastPlacedIndex = 1`
2. `a` 在旧列表中的索引是 0，小于 1，说明 `a` 需要移动

所以 React 会给 `a` 标记 `Placement`。

---

## 十一、为什么 `key` 很重要

`key` 的作用不是单纯消除 warning，而是告诉 React：

**这个节点在多次渲染之间是否是“同一个节点”。**

如果没有 `key`，React 就只能按索引去比较。   这在插入、删除、重排场景下容易导致：

- 错误复用 DOM 或组件实例
- 额外的更新
- 组件状态错位

例如：

```jsx
旧：[1, 2, 3]
新：[1, 3]

```

如果没有 `key`，React 会按索引比较：

- `1 -> 1`，复用
- `2 -> 3`，误以为是更新
- 最后的 `3` 被删除

从界面结构上可能最终是对的，但中间的 Fiber 复用和组件状态保留就可能出问题。

### `key` 的原则

- 同级唯一
- 稳定
- 尽量不要用数组索引作为动态列表的 `key`

---

## 十二、属性更新和结构更新的关系

React Diff 不仅处理节点的新增、删除、移动，也会处理节点更新。

如果节点类型相同，React 通常会复用该 Fiber，并比较：

- 文本内容是否变化
- DOM 属性是否变化
- 事件是否变化
- 子节点是否变化

需要注意的是：

- **render 阶段** 负责判断“哪里变了”，并给 Fiber 打上 `Update` 等标记
- **commit 阶段** 才真正把属性和 DOM 变化应用到页面上

所以属性变化本质上也是 Diff 的结果之一。

---

## 十三、从源码角度看 Diff 的关键函数

如果从 Fiber reconciler 的源码角度看，Diff 相关关键函数主要包括：

- `beginWork`：开始处理当前 Fiber
- `reconcileChildren`：协调当前 Fiber 的子节点
- `reconcileChildFibers`：子节点协调总入口
- `reconcileSingleElement`：处理单个元素节点
- `reconcileSingleTextNode`：处理文本节点
- `reconcileChildrenArray`：处理数组子节点
- `updateSlot`：第一轮按顺序尝试复用
- `updateFromMap`：第二轮从 Map 中查找可复用节点
- `placeChild`：判断节点是否需要插入或移动
- `deleteChild` / `deleteRemainingChildren`：标记删除节点

这些函数共同完成了：

- 比较新旧节点
- 创建或复用 Fiber
- 记录新增、删除、移动、更新等副作用

---

## 十四、React Diff 的几个常见误区

### 1. React Diff 不是直接操作 DOM

Diff 发生在 render 阶段，产出的是新的 Fiber 和副作用标记，真正的 DOM 操作发生在 commit 阶段。

### 2. React Diff 不是比较两棵完整的新旧 Fiber 树

旧的一侧是现有的 `current Fiber`，新的一侧通常是本次 render 产生的 ReactElement。   React 是边比较边创建新的 `workInProgress Fiber`。

### 3. React 不会做跨层移动识别

如果节点跨层移动，React 不会把它识别成“移动”，而是按“删除 + 新建”处理。

### 4. `key` 不是给 React 消除警告用的

`key` 的本质作用是帮助 React 识别同层节点的稳定身份，从而正确复用 Fiber 和组件状态。

---

## 十五、总结

React Diff 算法并不是追求理论上的最小编辑距离，而是基于以下几个前提：

- **只比较同层节点**
- **节点类型不同时直接替换整棵子树**
- **通过** `**key**` **标识同层节点的稳定身份**

在 render 阶段，React 会边比较边生成新的 Fiber 树，并把新增、删除、移动、更新等副作用记录到 `flags` 上；   到了 commit 阶段，再统一把这些变更应用到真实 DOM。

所以 React Diff 的本质可以概括为：

**一种基于 Fiber 的、同层线性比较的启发式协调算法。**

# React Diff 算法

React 的 Diff，本质上是 React 在 **render 阶段** 对新旧节点进行协调（Reconciliation）的过程。

它的目标不是求两棵树的最小编辑距离，而是基于一套启发式规则，在 **O(n)** 的复杂度内尽可能高效地找出本次更新需要执行的变更。

可以先用一句话概括：

**React Diff = 用旧 Fiber 和新的 ReactElement 进行比较，边比较边生成新的 Fiber，并把新增、删除、移动、更新等副作用记录到 flags 上，等待 commit 阶段统一执行。**

---

## 一、为什么需要 Diff

如果要精确求解两棵树的最小编辑距离，时间复杂度通常是 **O(n³)**，在 UI 渲染场景中成本太高。

因此 React 没有采用“最优 Diff”，而是采用了“足够快”的启发式算法，核心假设有两个：

1. **不同类型的节点，会生成不同的子树**
2. **同一层级的子节点，可以通过** `**key**` **标识稳定身份**

基于这两个假设，React 把复杂的树编辑问题简化为了同层节点之间的线性比较，从而把复杂度控制在 **O(n)**。

---

## 二、Diff 发生在什么时候

Diff 发生在 **render 阶段**，准确来说是在 `beginWork` 中协调子节点时发生的。

React 不是先构建一棵完整的新树，再和旧树整体比较，而是：

- 读取旧的 `current Fiber`
- 根据新的 ReactElement 创建或复用新的 Fiber
- 在创建新 Fiber 的过程中完成 Diff
- 同时收集副作用标记

所以更准确地说，React 做的不是传统意义上的“整树对比”，而是 **边生成边比较**。

---

## 三、Diff 比较的到底是什么

React Diff 比较的不是两棵真实 DOM 树，也不是简单地比较两棵 ReactElement 树。

更准确的说法是：

**React 会拿当前的 Fiber 节点（current）和本次 render 生成的新 ReactElement 做比较，并在此基础上构建新的 workInProgress Fiber。**

所以它的输入输出可以理解为：

```ts
current Fiber + new ReactElement
  =>
workInProgress Fiber + flags

```

其中：

- `current Fiber`：上一次已经提交到页面的旧节点
- `new ReactElement`：本次 render 返回的新节点描述
- `workInProgress Fiber`：本次 render 过程中生成的新 Fiber
- `flags`：记录本次更新需要在 commit 阶段执行的副作用

---

## 四、Diff 的结果是什么

Diff 的结果不是立刻操作 DOM，而是：

- 复用旧 Fiber
- 创建新 Fiber
- 标记待删除的 Fiber
- 给 Fiber 打上副作用标记

常见副作用包括：

- `Placement`：插入或移动
- `Update`：更新
- `Deletion` / `ChildDeletion`：删除

另外：

- `flags`：表示当前 Fiber 自己的副作用
- `subtreeFlags`：表示整棵子树上的副作用汇总

这些标记会在 render 阶段收集好，等到 commit 阶段统一执行。

---

## 五、React Diff 的核心规则

### 1. 只比较同层节点

React 不会跨层比较节点。  如果一个节点从这一层移动到另一层，React 不会尝试识别“跨层移动”，而是会认为：

**旧节点删除 + 新节点创建**

这也是 React 能把复杂度控制在 O(n) 的关键前提之一。

### 2. 类型不同，直接替换整棵子树

如果旧节点和新节点的 `type` 不同：

- 旧 Fiber 以及它的整棵子树都会被卸载
- 创建新的 Fiber 和新的子树

这里的 `type` 可以是：

- 原生 DOM 标签：如 `div`、`span`
- 函数组件
- 类组件
- `Fragment` 等特殊类型

### 3. 类型相同，尽量复用

如果 `type` 相同，React 会尽量复用当前 Fiber，并继续比较：

- `props`
- 子节点
- 是否需要更新

对于原生 DOM 节点，类型相同通常表示可以复用对应的 DOM 节点，再比较属性和 children。  对于组件节点，类型相同表示可以复用组件对应的 Fiber，再重新执行 render 得到新的子节点树。

---

## 六、单节点 Diff

如果当前节点下只有一个子节点，规则比较简单：

- `key` 相同且 `type` 相同：复用旧 Fiber
- `key` 不同或 `type` 不同：删除旧 Fiber，创建新 Fiber

例如：

```jsx
<div>{isLogin ? <User key="user" /> : <Login key="login" />}</div>
```

由于 `key` 和 `type` 都不同，React 会直接卸载旧子树并挂载新子树。

---

## 七、多子节点 Diff：React Diff 最核心的部分

当一个节点下有多个 children 时，React 会进入数组子节点的协调逻辑。  源码中这一部分的核心函数主要是：

- `reconcileChildren`
- `reconcileChildFibers`
- `reconcileChildrenArray`
- `updateSlot`
- `updateFromMap`
- `placeChild`
- `deleteChild`

整个过程可以分成两轮。

---

## 八、第一轮：从左到右顺序比较

React 会同时遍历：

- 旧 Fiber 的兄弟链表
- 新 children 数组

按顺序逐个比较当前这一位是否能复用。

复用条件通常是：

- `key` 相同
- `type` 相同

如果匹配成功：

- 复用旧 Fiber
- 创建新的 workInProgress Fiber
- 继续比较下一个位置

如果中途发现某一项不匹配，就退出第一轮，进入第二轮。

这样做的目的是为了优化最常见的场景：**列表前缀稳定，只在后面发生少量变化**。

例如：

```jsx
旧：[a, b, c]
新：[a, b, d]

```

前两个节点可以快速复用，到 `c` 和 `d` 不匹配时停止。

---

## 九、第二轮：把剩余旧节点放进 Map 再查找

一旦第一轮无法继续，React 会把剩余旧 Fiber 节点放入一个 Map 中：

- 如果节点有 `key`，就用 `key` 作为 Map 的键
- 如果没有 `key`，就退化为使用旧索引 `index`

然后继续遍历剩余的新 children：

- 如果能在 Map 中找到可复用节点，就复用它
- 如果找不到，就创建新 Fiber，并标记 `Placement`
- 遍历结束后，Map 中还剩下的旧 Fiber，统一标记删除

这一步解决的是：

- 节点插入
- 节点删除
- 节点重排

---

## 十、React 如何判断节点是否需要移动

React 并不会去求最小移动次数，它使用的是一种更高效的启发式策略：`lastPlacedIndex`。

### 基本思路

React 在遍历新 children 时，会记录一个当前“已经确认不需要移动”的最大旧索引：`lastPlacedIndex`。

对于每一个被复用的节点：

- 如果它在旧列表中的索引 **大于等于** `lastPlacedIndex`   说明它的相对顺序没有倒退，不需要移动
- 如果它在旧列表中的索引 **小于** `lastPlacedIndex`   说明它相对于前面的节点发生了倒退，需要移动，打上 `Placement`

### 例子

旧列表：

```jsx
[a, b, c, d];
```

新列表：

```jsx
[b, a, c, d];
```

遍历新列表时：

1. `b` 在旧列表中的索引是 1，更新 `lastPlacedIndex = 1`
2. `a` 在旧列表中的索引是 0，小于 1，说明 `a` 需要移动

所以 React 会给 `a` 标记 `Placement`。

---

## 十一、为什么 `key` 很重要

`key` 的作用不是单纯消除 warning，而是告诉 React：

**这个节点在多次渲染之间是否是“同一个节点”。**

如果没有 `key`，React 就只能按索引去比较。   这在插入、删除、重排场景下容易导致：

- 错误复用 DOM 或组件实例
- 额外的更新
- 组件状态错位

例如：

```jsx
旧：[1, 2, 3]
新：[1, 3]

```

如果没有 `key`，React 会按索引比较：

- `1 -> 1`，复用
- `2 -> 3`，误以为是更新
- 最后的 `3` 被删除

从界面结构上可能最终是对的，但中间的 Fiber 复用和组件状态保留就可能出问题。

### `key` 的原则

- 同级唯一
- 稳定
- 尽量不要用数组索引作为动态列表的 `key`

---

## 十二、属性更新和结构更新的关系

React Diff 不仅处理节点的新增、删除、移动，也会处理节点更新。

如果节点类型相同，React 通常会复用该 Fiber，并比较：

- 文本内容是否变化
- DOM 属性是否变化
- 事件是否变化
- 子节点是否变化

需要注意的是：

- **render 阶段** 负责判断“哪里变了”，并给 Fiber 打上 `Update` 等标记
- **commit 阶段** 才真正把属性和 DOM 变化应用到页面上

所以属性变化本质上也是 Diff 的结果之一。

---

## 十三、从源码角度看 Diff 的关键函数

如果从 Fiber reconciler 的源码角度看，Diff 相关关键函数主要包括：

- `beginWork`：开始处理当前 Fiber
- `reconcileChildren`：协调当前 Fiber 的子节点
- `reconcileChildFibers`：子节点协调总入口
- `reconcileSingleElement`：处理单个元素节点
- `reconcileSingleTextNode`：处理文本节点
- `reconcileChildrenArray`：处理数组子节点
- `updateSlot`：第一轮按顺序尝试复用
- `updateFromMap`：第二轮从 Map 中查找可复用节点
- `placeChild`：判断节点是否需要插入或移动
- `deleteChild` / `deleteRemainingChildren`：标记删除节点

这些函数共同完成了：

- 比较新旧节点
- 创建或复用 Fiber
- 记录新增、删除、移动、更新等副作用

---

## 十四、React Diff 的几个常见误区

### 1. React Diff 不是直接操作 DOM

Diff 发生在 render 阶段，产出的是新的 Fiber 和副作用标记，真正的 DOM 操作发生在 commit 阶段。

### 2. React Diff 不是比较两棵完整的新旧 Fiber 树

旧的一侧是现有的 `current Fiber`，新的一侧通常是本次 render 产生的 ReactElement。   React 是边比较边创建新的 `workInProgress Fiber`。

### 3. React 不会做跨层移动识别

如果节点跨层移动，React 不会把它识别成“移动”，而是按“删除 + 新建”处理。

### 4. `key` 不是给 React 消除警告用的

`key` 的本质作用是帮助 React 识别同层节点的稳定身份，从而正确复用 Fiber 和组件状态。

---

## 十五、总结

React Diff 算法并不是追求理论上的最小编辑距离，而是基于以下几个前提：

- **只比较同层节点**
- **节点类型不同时直接替换整棵子树**
- **通过** `**key**` **标识同层节点的稳定身份**

在 render 阶段，React 会边比较边生成新的 Fiber 树，并把新增、删除、移动、更新等副作用记录到 `flags` 上；   到了 commit 阶段，再统一把这些变更应用到真实 DOM。

所以 React Diff 的本质可以概括为：

**一种基于 Fiber 的、同层线性比较的启发式协调算法。**

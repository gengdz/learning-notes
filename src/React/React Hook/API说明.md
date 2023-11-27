# API 说明

## reactDOM.render 的作用？

render 可以将 React 组件渲染到指定的位置。 React 会通过虚拟 DOM 的方式高效地处理 DOM 的修改和更新，从而实现高效的页面渲染和更新。

- 可以在 JS 中使用。
- 在初始化的时候被调用了一次。

## reactDOM.createPortal 的作用？

createPortal 可以将 React 组件渲染到任意的位置。（可以是根节点外）。

- 必须在 React 的组件中使用。（依赖了 React 的内部机制，使用到了 React 上下文）

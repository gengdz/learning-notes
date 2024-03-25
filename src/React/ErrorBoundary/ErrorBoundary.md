# ErrorBoundary

错误边界。

## 为什么做？

出发点：**部分 UI 的 JS 错误不应该导致整个页面崩溃。**

## 能捕获的错误

1. **渲染期间**
2. **生命周期方法**
3. **构造函数** 这些地方发生错误都能被捕获

## 不能捕获的错误

1. 事件处理（例如 onClick）
2. 异步代码（例如 setTimeout、requestAnimationFrame）
3. 服务端渲染
4. ErrorBoundary 自身抛出的错误

## 怎么做？

如果类组件定义了生命周期方法 static getDerivedStateFromError() 或 componentDidCatch() 中的一个（或两个），则它将成为错误边界。

React 推荐：

- 使用静态 getDerivedStateFromError() 方法来重设 state。
- 使用 componentDidCatch() 方法来记录错误信息。

注意：

从 React 16 开始任何错误边界未捕获的错误将导致整个 React 组件树的卸载。

这是一个破坏性的变更。也就是说如果程序不进行任何修改，过往在 v15 中不显示错误节点的表现会变为整个页面白屏：

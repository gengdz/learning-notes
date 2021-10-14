# ErrorBoundary
错误边界。
出发点：**部分 UI 的 JS 错误不应该导致整个页面崩溃。**




## 能捕获的错误
1. **渲染期间**
2. **生命周期方法**
3. **构造函数**
这些地方发生错误都能被捕获


## 不能捕获的错误
1. 事件处理（例如 onClick）
2. 异步代码（例如 setTimeout、requestAnimationFrame）
3. 服务端渲染
4. ErrorBoundary 自身抛出的错误
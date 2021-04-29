# Proxy 实现响应式

使用 Proxy 实现响应式是这样的原理

在 get 方法中 收集依赖（依赖就是使用到这个对象的地方），然后在 set 中触发变更。



维护一个 Map 结构如下。其中 对象是 key，值是一个 Map。
```typescript
const connectionStore = new WeakMap<Raw, ReactionForRaw>();


const keyMap = new Map<string, Set<Function>()
```



[这个是自己写的 reactive](https://codesandbox.io/s/reactive-pnil3?file=/src/App.tsx)


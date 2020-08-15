# Hook 进阶用法

## 应该使用单个 state 还是多个 state 变量
在 Class 组件中，我们把所有的 state 放在一个对象中，在 Hook 中，我们可以使用多个 `useState`，那么应该使用一个还是多个呢？
**推荐用法：**
1. 把完全不相关的 state 拆分为多个。比如你有需要发送3个请求，那个每个请求的 data, loading。
2. 如果某些 state 是相互关联的，或者需要一起改变的，那就把它们合并成一组state。


## deps 依赖过多
**依赖数组依赖的值最好不要超过 3 个，否则会导致代码会难以维护。**

找问题
```javascript
function Example({id}) {
  const requestParams = useRef({});

  useEffect(() => {
    requestParams.current = {page: 1, size: 20, id};
  });

  const refresh = useCallback(() => {
    doRefresh(requestParams.current);
  }, []);


  useEffect(() => {
    id && refresh();
  }, [id, refresh]); // 思考这里的 deps list 是否合理？
}
```
虽然 `useEffect` 的用到了 *refresh* 但是它在首次 render 之后，就永远不会改了变了。所以把它作为 依赖项是多余的。

其次，如果依赖项都是需要的，那么这些逻辑是否应该放在同一个 hook 中？也就是说，如果逻辑是相互独立的，那么应该将逻辑放在不同的 `useEffect` 中。

**总结起来，减少依赖项的方法有如下几个：**
1. 去掉不必要的依赖
2. 将 Hook 拆分为 逻辑更独立更小的单元
3. 通过合并相关的state, 将多个依赖值聚合为一个
4. 通过 `setState` 回调函数的方式来获取最新的 `state`, 以减少外部依赖



## React中性能优化

### Hook 会因为在渲染时创建函数而变慢吗？
不会。在现代浏览器中，闭包和类的原始性能只有在极端场景下才有明显的差别。
另外：结合 `useCallback`,`useMemo`,`useReducer` 效果更佳
具体的可以看 [React FAQ -> Hook 会因为在渲染时创建函数而变慢吗？](https://zh-hans.reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render)



### React.memo

说明：用在函数式组件中，类似于class组件中的 **PureComponent**，作用是性能优化。

方法签名如下
```typescript
function memo<T extends ComponentType<any>>(
  Component: T,
  propsAreEqual?: (prevProps: Readonly<ComponentProps<T>>, nextProps: Readonly<ComponentProps<T>>) => boolean
): MemoExoticComponent<T>;
```
说明：
* 默认会对 props 做一个浅比较
* 第二个参数为可选参数，可以手动指定什么时候更新


用法如下
```javascript
export default React.memo(ProjectCard);
```

实际测试效果：
`<ProjectCard />` 组件在使用了 `React.memo` 之后，当列表页面刷新的时候，该组件只加载了**pageSize 次**，如果不使用 `memo` 的话，页面加载的数量大大增加。



### useMemo
#### 使用场景
一、**应该使用 `useMemo` 的场景**
1. 保持引用相等
    * 对于组件内部用的 object, array, 函数等，如果用在了其他 Hook 的依赖项中，应该使用 `useMemo`
    * 作为 props 传递给下游组件，应该使用 `useMemo`
    * 自定义 Hook 暴露出来的 object, array, 函数等，都应该使用 `useMemo`
    * 使用 `Context`时， `Provider`中的 value 应该使用 `useMemo` 

2. 成本很高的计算
  * 比如 `cloneDeep` 一个很大并且层级很深的数据

二、**无需使用 `useMemo` 的场景**
1. 如果返回值是原始值
2. 仅在组件内部用的 object, array, 函数等（没有作为 props 传递给自组件），且没有用到其他 Hook的依赖数组中，一般不需要使用 `useMemo`




### useCallback
`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`
所以它的使用规则和上面的是一样的
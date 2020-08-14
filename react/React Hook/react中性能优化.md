# React中性能优化

## React.memo

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



## useMemo


## useCallback
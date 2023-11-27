# Redux使用
## Hooks

###  useSelector

#### 基本使用

```typescript
const result: any = useSelector(selector: Function, equalityFn?: Function)
```

通过 `selector` 函数，就可以从 *Redux store state* 取数据啦。
> 警告：*selector* 函数应该是一个纯函数，因为它可能在任意时间执行多次



#### 相等比较和更新
对于 *useSelector()* 来说，**默认情况下：返回一个新的对象引用总是会触发重渲染**。

重点看第二个参数。可以通过指定第二个参数来声明 *比较函数* 如果想要使用浅比较的方式，可以使用 `R.equals` 或者 *react-redux* 提供的 `shallowEqual` <small>测试起来好像不好使</small>。




#### 与 `connect()` 的区别
*useSelector()* 默认使用 *===* 严格相等来比较返回值。*connect() 使用 **浅比较** 来比较 mapState 执行后的结果，从而决定是否触发重渲染。*



## connect 方法
```javascript
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

const mapStateToProps = (state) => ({dict: state.dict}); // 接受 state 返回一个对象
const mapDispatchToprops = (dispatch) => ({ getDict: bindActionCreators(actions.getDict, dispatch) }) // 也是返回一个对象
```

# React 下 DDD

## 文件目录划分原则
作为一个功能，逻辑，视图，样式，请求等等所有组成部分，应该是一个完整的，不可分割的整体，这样你才能像搭积木一样工程化运用他。
如果拆开，调试困难，追踪困难，不利于分工合作。
一个文件夹，即是一个模块，文件夹嵌套就是模块嵌套，他们共同组成了 app


我们把状态逻辑叫做服务。


## React Hooks的本质
管道风格的极限函数式！
react hooks api 本质上就是 类似 rxjs 的管道结构。
我们把 React Hooks规则罗列一下：
* 确保总在你的 React 函数的最顶层调用Hook
* 不要在循环，条件或者嵌套函数中调用Hook

这些规则一加，你再把**依赖数组作为形参，回调作为操作函数，按照顺序连接起来，这是不是一个管道？**
举个例子
```javascript
const [state,setState] = useState(0)
useEffect(()=>{
  console.log(map 1 time)
},[state])

useEffect(()=>{
  console.log(map 2 time)
},[state])
```
上面的结构会组装成
```javascript
ReactScheduler$.pipe(
  startWith({state: 0,setState(res){this.state = res}}),
  map((res)=>{console.log(map 1 time);return res}),
  map((res)=>{console.log(map 2 time);return res}),
)
```

这个**按照次序调用的Hooks,就是管道操作函数，依赖数组就是管道函数的形参，回调就是操作函数**

## React 中性能
其实大部分时候，框架的基准优化都是次要的，最重要的是**业务级别的优化**
**惰性初始化是性能优化的唯一考量**


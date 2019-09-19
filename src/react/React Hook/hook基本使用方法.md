## useEffect

### 使用场景

* 在类似于生命周期或者某个值变化的时候使用
* useState产生的changeState方法后并没有类似setState第二个参数一样的功能，所以如果需要在state改变之后执行，那么必须使用useEffect

### 使用说明

该钩子接收连个参数，第一个参数 **函数** 是副作用需要执行的回调，生成的回调函数可以返回一个函数。(*将在组件卸载的时候运行* )，第二个参数为 **数组** ，将在数组发生变化执行。

```javascript
const [count, changeCount] = useState(0);

// 将在count变化时打印最新的count数据
useEffect(() => {
  message.info(`count发生变动，最新值为${count}`);
}, [count])

```


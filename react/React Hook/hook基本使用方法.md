# React Hook介绍

React中内置的Hook有以下这些

- [基础 Hook](https://react.docschina.org/docs/hooks-reference.html#basic-hooks)
  - [`useState`](https://react.docschina.org/docs/hooks-reference.html#usestate)
  - [`useEffect`](https://react.docschina.org/docs/hooks-reference.html#useeffect)
  - [`useContext`](https://react.docschina.org/docs/hooks-reference.html#usecontext)
- [额外的 Hook](https://react.docschina.org/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](https://react.docschina.org/docs/hooks-reference.html#usereducer)
  - [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback)
  - [`useMemo`](https://react.docschina.org/docs/hooks-reference.html#usememo)
  - [`useRef`](https://react.docschina.org/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](https://react.docschina.org/docs/hooks-reference.html#usedebugvalue)

## useEffect

### 使用场景

* 在类似于生命周期或者某个值变化的时候使用
* useState产生的changeState方法后并没有类似setState第二个参数一样的功能，所以如果需要在state改变之后执行，那么必须使用useEffect
* 当需要执行操作的时候，可以嵌入进去。这里可以做的事情很多。比如发送网络请求或者进行监视器的监听

### 使用说明

该钩子接收两个参数，第一个参数 **函数** 是副作用需要执行的回调，生成的回调函数可以返回一个函数。(*将在组件卸载的时候运行* )，第二个参数为 **数组** ，将在数组发生变化执行。

它有两个参数，第一个参数是一个函数，可以有返回值，也可以没有返回值，第二个参数是可选参数，为一个数组，只要这个数组发生变化，那么`useEffect` 就会执行

* 如果只要一更新就执行一次，那么只需要写第一个函数即可。
* 如果只需要执行一次，那么将第二个参数设置为空数组 【】

* 如果只有当一些变量变化的时候发送请求，那么将第二个参数设置为 【field1，field2】
* 如果需要在组件卸载的时候执行清除副作用操作，那么将第一个函数返回一个函数即可

代码示例

```javascript
const [count, changeCount] = useState(0);

// 将在count变化时打印最新的count数据
useEffect(() => {
  message.info(`count发生变动，最新值为${count}`);
}, [count])


// 这是第二个示例
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
});
```



## useContext

### 使用场景

* 在需要用到context的时候可以使用这个方式

### 使用说明

```javascript
import React, { useContext } from "react";
import ReactDOM from "react-dom";

const AppContext = React.createContext({})

const Navbar = () => {
  const { userName } = useContext(AppContext)
  return(
    <div className="navbar">
      <p>AwesomeSite</p>
      <p>{username}</p>
    </div>
  )
}

const Messages = () => {
  const { userName } = useContext(AppContext)
  return(
    <div className="messages">
      <h1>Messages</h1>
      <p>1 message for {username}</p>
      <p className="message">useContext is awesome!</p>
    </div>
  )
}

function App() {
  <AppContext.Provider value= {{
    userName: 'gdz'                             
  }}>
    <div className="App">
        <Navbar />
        <Messages />
    </div>
  </AppContext>
}
```



## useReducer

### 使用场景

* state逻辑复杂，并且包含多个子值
* 下一个state依赖之前的state

### 使用说明

它是`useState` 的替代方案。就是说如果你的某个state是一个对象，里面还有比较多的属性的时候，这个时候你可以使用类似于redux中 action -> state 的方式，这样的好处是，1）你可以依赖之前的状态去生成新的state，2）你可以对一个state进行多种方式的处理 

使用语法是

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init)
```



代码示例

```javascript
// 定义一个reducer，用来处理action
function reducer(state, { type, payload }) {
  switch (type) {
    case 'updateState':
      return { ...state, ...payload };
    default:
      return state;
  }
}

// useReducer
const [tableState, tableDispatch] = useReducer(reducer, {
  rows: [],
  total: 0,
  loading: true,
})
const { rows, total, loading } = tableState;

// 使用
function getTableData(data = {}) {
  tableDispatch({
    type: 'updateState',
    payload: { loading: true },
  });
  const params = {
    url: queryServer,
    pageNo,
    pageSize,
    query: queryParams,
    ...data,
  };
  getDyncPageTableData(params).then(d => {
    tableDispatch({
      type: 'updateState',
      payload: { ...d, loading: false },
    })
  })
}
```



## useMemo

### 使用场景

* 这个hook是用来做性能优化的

* 只需要在某些依赖项变化的时候才调用某个方法

### 使用说明

useMemo接受两个参数，第一个是一个函数，第二个是依赖项数组，只有当依赖项目发生改变的时候，才会执行第一个函数

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```




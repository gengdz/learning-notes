# React Hook 基础

## 为什么有 Hook？

1. **状态逻辑难以复用** 。如把组件连接到 store，可以通过 「_render props_」 或者 「_高阶组件_」 的方式解决，但是会改变组件结构并会引入「_嵌套地狱_」
2. **复杂组件变得难以理解** 。你要按照生命周期拆分一些相关的事件到不同的生命周期，比如事件的监听和取消监听
3. **Class 难以理解** 。Class 有学习成本。比如 this 绑定

## React 中内置的 Hook 有以下这些

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

## 为什么不能在条件中使用

由于 React 依赖于这些调用的顺序来关联组件状态。

React 内部是用数组来存储这些 hooks 的，内部会在内存中为每个组件维护一个索引，指示当前正在处理哪个 Hook。更新的时候就更新这个 hooks 数组索引的值。

## useState

### 使用场景

- 设置 state
- 函数式组件没有 construct，可以使用这个达到类似的效果

### 使用说明

这个钩子的使用形式如下：

```javascript
// 1.直接给一个初始值比如 string，number，对象，数组
const [data, setData] = useState('test');

// 2.如果 state 的初始值比较复杂，可以传递一个函数给 `useState`
const [data, setData] = useState(() => {
  const initialValue = someExpensiveComputation(props);
  return initialValue;
});
```

如果现在的状态要依赖之前的状态可以通过传给 setData 一个函数，类似于如下方式

```javascript
setData((prevState) => ({ ...prevState, name: 'gdz' }));
```

## useEffect

### 使用场景

- 在类似于生命周期或者某个值变化的时候使用
- useState 产生的 changeState 方法后并没有类似 setState 第二个参数一样的功能，所以如果需要在 state 改变之后执行，那么必须使用 useEffect
- 当需要执行操作的时候，可以嵌入进去。这里可以做的事情很多。比如发送网络请求或者进行监视器的监听

### 使用说明

该钩子接收两个参数，第 1 个参数 **函数** 是副作用需要执行的回调，生成的回调函数可以返回一个函数。(_将在组件卸载的时候运行_ )，第 2 个参数为 **数组** ，只要这个数组发生变化，那么 `useEffect` 就会执行

- 如果只要更新就执行，那么只需要写第一个函数即可。
- 如果只需要执行一次，那么将第二个参数设置为空数组 []

- 如果只有当一些变量变化的时候发送请求，那么将第二个参数设置为 [field1, field2]
- 如果需要在组件卸载的时候执行清除副作用操作，那么将第一个函数返回一个函数即可

代码示例

```javascript
const [count, changeCount] = useState(0);

// 将在 count 变化时打印最新的 count 数据
useEffect(() => {
  message.info(`count 发生变动，最新值为${count}`);
}, [count]);

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

### useEffect with async

在 `useEffect()` 里面写 _async_ 需要用下面的方式。

```javascript
// 正确的方式
useEffect(() => {
  const fetchData = async () => {
    const result = await axios(
      'http://hn.algolia.com/api/v1/search?query=redux',
    );
    setData(result.data);
  };
  fetchData();
}, []);

// 不正确的方式
useEffect(async () => {
  const result = await axios('http://hn.algolia.com/api/v1/search?query=redux');
  setData(result.data);
}, []);
```

## useLayoutEffect

## 使用场景

- 需要根据新的 UI 来进行 DOM 操作，也就是说页面渲染出来是最终的效果，如果使用 `useEffect` ，页面很可能会因为渲染了两次而出现了抖动。

### 使用方法

使用方法和 `useEffect` 一模一样。

## useContext

### 使用场景

- 在需要用到 context 的时候可以使用这个方式

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

- state 逻辑复杂，并且包含多个子值
- 下一个 state 依赖之前的 state

### 使用说明

它是 `useState` 的替代方案。就是说如果你的某个 state 是一个对象，里面还有比较多的属性的时候，这个时候你可以使用类似于 redux 中 action -> state 的方式，这样的好处是：1）你可以依赖之前的状态去生成新的 state，2）你可以对一个 state 进行多种方式的处理

使用语法是

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

代码示例

```javascript
// 定义一个 reducer，用来处理 action
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
});
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
  getDyncPageTableData(params).then((d) => {
    tableDispatch({
      type: 'updateState',
      payload: { ...d, loading: false },
    });
  });
}
```

## useMemo

### 使用场景

- 这个 hook 是用来做性能优化的
- 只需要在某些依赖项变化的时候才调用某个方法
- 当进行昂贵的计算的时候，要考虑是不是有相关的依赖项，减少没必要的渲染
- 减少不必要的子组件渲染

### 使用说明

useMemo 接受两个参数，第一个是一个函数，第二个是依赖项数组，只有当依赖项发生改变的时候，才会执行第一个函数，**返回值是一个变量**

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

```javascript
function Parent({ a, b }) {
  // 当 a 改变时才会重新渲染
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // 当 b 改变时才会重新渲染
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  );
}
```

## useCallback

### 使用场景

- 这个 hook 使用来做性能优化的
- 外部组件在特定条件下调用该组件方法的时候

### 使用说明

1. useCallback 接受两个参数，第一个是函数，第二个是依赖项数组，只有当依赖项发生改变的时候，才会执行第一个函数，**返回值是一个函数**。这样只要子组件继承了 PureComponent 或者使用 React.memo 就可以有效避免不必要的 VDOM 渲染。

2. `React.memo` 和 `React.useCallback` 一定记得需要配对使用，缺了一个都可能导致性能不升反“降”

```javascript
useCallback(fn, deps); // 相当于 useMemo(() => fn, deps)。
```

代码示例

```javascript
// 子组件
const Child = React.memo(function ({ val, onChange }) {
  console.log('render...');

  return <input value={val} onChange={onChange} />;
});

// 在这里面使用 Child
function App() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const onChange1 = useCallback((evt) => {
    setVal1(evt.target.value);
  }, []);

  const onChange2 = useCallback((evt) => {
    setVal2(evt.target.value);
  }, []);

  return (
    <>
      <Child val={val1} onChange={onChange1} />
      <Child val={val2} onChange={onChange2} />
    </>
  );
}
```

### useCallback with async

如果在 `useCallback` 中使用 _async_ 可以使用如下方式

```javascript
const func = useCallback(async (data) => {
  // do something
}, []);
```

## useRef

### 使用场景

- 拿到元素的 DOM 实例
- 父组件调用自组件里面的方法

### 使用说明

语法是

```javascript
const refContainer = useRef(initialValue);
```

里面有一个 `current` 属性值，代表当前 DOM 实例，然后使用如下方法就可以调用该 DOM 的实例方法

```javascript
inputEl.current.focus();
```

代码说明：

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

需要注意的

- 当 ref 对象内容发生改变的时候，**useRef 并不会通知你！**，因为变更 .current 属性并不会引发组件的重新渲染。

## useImperativeHandle

### 使用场景

- 暴露方法供别的组件调用

### 使用说明

```javascript
// 子组件
function Child(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return <input ref={inputRef} {...props} />;
}
export default forwardRef(FancyInput);

// 父组件
function Father(props) {
  const ref = useRef();

  // 假设有个 handle 方法，想要调用子组件的 focus 方法
  const handle = () => {
    ref.current.focus();
  };

  return <Child ref={ref} />;
}
```

- `Function Component` 没有 ref，所以没有办法直接调用里面的方法，但是可以在子组件中使用 `useImperativeHandle` + `forwordRef` 这套组合拳向外暴露方法出去。

## QA

### useLayoutEffect 和 useEffect 的区别

React 的工作流程可以更详细地划分为以下几个步骤：

详情见 理论知识 那一篇。

在提交阶段中。

1. DOM 已经更新完毕，但浏览器还没有进行任何的绘制。这时会调用 useLayoutEffect 钩子，同步执行 注册的回调函数。
2. 在浏览器绘制操作完成之后，useEffect 钩子会被调用。这时候屏幕已经渲染了新的内容。异步执行注册的回调函数。在浏览器已经空闲的时候执行，requestIdleCallback

什么时候使用 useLayoutEffect

- 读取布局信息，决定后续动画等：当你需要读取布局信息，比如元素的位置或尺寸，并且基于这些信息来执行一些操作时。比如获取一个 DOM 元素的宽高来决定接下来的动画效果。
- 同步更新 DOM:如果你需要在 DOM 更新后立即同步地修改 DOM，以避免可能的渲染闪烁，那么你应该使用 useLayoutEffect。例如，调整滚动位置或者执行一个需要在布局变化之后立即生效的 DOM 操作。
- 避免视觉闪烁：在执行能引起 DOM 布局变化的操作时，使用 useLayoutEffect 可以避免视觉上的抖动或闪烁，因为任何布局变动都会在页面重绘前完成。
- 同步重新渲染：当你需要强制浏览器在继续进行任何进一步渲染之前完成一个更新周期时。例如，在某些复杂的动画之前需要重置状态。

总结如下：

- useEffect 是异步非阻塞调用；useLayoutEffect 是同步阻塞调用
- useEffect 是浏览器绘制后；useLayoutEffect 是 DOM 变更后，浏览器绘制前完成所有操作；
- useEffect 不会阻塞渲染，只有在涉及到**修改 DOM**、**动画**等场景下考虑使用 useLayoutEffect，所有的修改会一次性更新到浏览器中，减少用户体验上的不适。

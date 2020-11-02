# useUserList
作用说明：
这个hook提供了：获取用户列表，加载，删除，添加功能。

代码如下：
```typescript
const useUserList = () => {
  const [users, setUsers] = useState([]);

  const [pending, setPending] = useState(false);
  const load = async params => {
    setPending(true);
    setUsers([]);
    const users = await request('/users', params);
    setUsers(users);
    setPending(false);
  };


  const deleteUser = useCallback(
    user => setUsers(users => without(users, user)),
    []
  );
  const addUser = useCallback(
    user => setUsers(users => users.concat(user)),
    []
  );


  return [users, { pending, load, addUser, deleteUser }];
};
```

这个hook其实有问题，这个hook包含了多个功能，拆分如下：
1. 加载一个远程数据，并且控制 pending 状态。
2. 往一个数组中增加或者删除内容
3. 将列表数据和操作列表数据的方法（add, delete) 合在一起返回。
4. 指定加载用户列表这个具体业务场景

拆解下来发现：1-3 是通用能力，而不是业务能力



## hook 拆分

### 状态与操作封装
通用方法封装 `useMethods`
作用: 给我一个值，和一堆方法，我帮你变成hook
```javascript
const useMethods = (initialValue, methods) => {
  const [value, setValue] = useState(initialValue);
  const boundMethods = useMemo(
    () => Object.entries(methods).reduce(
      (methods, [name, fn]) => {
        const method = (...args) => {
          setValue(value => fn(value, ...args));
        }
        methods[name] = method;
        return methods;
      }
    )
  );
  return [value, boundMethods];
}
```

基于此封装常用的数据结构
针对数组 `useArray`
```javascript
const arrayMethods = {
  push(state, item) {
    return state.concat(item);
  },
  pop(state) {
    return state.slice(0, -1);
  },
  slice(state, start, end) {
    return state.slice(start, end);
  },
  empty() {
    return [];
  },
  set(state, newValue) {
    return newValue;
  },
  remove(state, item) {
    const index = state.indexOf(item);
    if (index < 0) {
      return state;
    }
    return [...state.slice(0, index), ...state.slice(index + 1)];
  }
};

const useArray = (initialValue = []) => {
  invariant(Array.isArray(initialValue), 'initialValue must be an array');
  return useMethods(initialValue, arrayMethods);
}
```



### 通用过程封装
`useTaskPending` 处理 pending
```javascript
const useTaskPending = task => {
  const [pendingCount, {increment, decrement}] = useMumber(0);
  const taskWithPending = useCallback(
    async (...args) => {
      increment();
      const result = await task(...args);
      decrement();
      return result;
  }, 
  [task, increment, decrement]);
  
  return [taskWithPending, pendingCount > 0] 
}
```

`useTaskPendingState` 处理 pending + data
```javascript
const useTaskPendingState = (task, storeResult) => {
  const [taskWithPending, pending] = useTaskPendingState(task);
  const callAndStore = useCallback(
   async () => {
      const result = await taskWithPending();
      storeResult(result);
    },
    [taskWithPending, stroeResult]
  );
  return [callAndStore, pending];
}
```



## 拼成业务
```javascript
const useUserList = () => {
  const [users, {push, remove, set }] = useArray([]);
  const [load, pending] = useTaskPendingState(userService, set);
  return [users, {pending, load, addUser: push, deleteUser: remove}];
}

```
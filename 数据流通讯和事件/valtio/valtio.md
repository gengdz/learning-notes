# valtio

## state 和 action 的组织方式 

```typescript
import { proxy } from 'umi';
 
// 方法一：放一起
const state = proxy({
  count: 0,
  actions: {
	  add() {
	    // 注意这里别用 this.count，基于 snap 调用时会报错
	    state.count += 1;
	  },
  }
});

// 方法二：分开放
const state = proxy({ count: 0 });
const actions = {
  add() {
    state.count += 1;
  },
  // 异步 action
  async addAsync() {
    state.count += await fetch('/api/add');
  },
};
```

放在一起的坏处是：
* 所有的逻辑需要集中写在 model 层，看起来离业务比较远。


## API 

`subscribeKey` 订阅代理对象中的一个原始值。当值变化的时候，执行回调。

`watch` 通过 getter 可以订阅多个代理对象。会立即执行一次，当代理对象变化时，执行回调。

`subscribe` 订阅一个代理对象。
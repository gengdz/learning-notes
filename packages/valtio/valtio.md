# valtio

```ts
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
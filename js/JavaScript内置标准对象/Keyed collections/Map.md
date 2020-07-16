# Map
**Map 对象用来保存键值对，并且能够记住键的原始插入顺序。 任何值（对象或者 原始值）都可以作为一个键或者一个值**


## 属性
* `size` 返回 Map 对象的成员数量



## 方法
* `set(key)`
* `get(key)`
* `has(key)` Map中是否有这个 key
* `delete(key)` 删除这个 key。如果这个 key 存在，会执行删除操作，然后返回 *true*, 如果不存在那么返回 *false*
* `forEach(callback(value,key,Map))` 这个函数的返回值为 `undefined`



## 初始化
```javascript
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

```



## Map 和 Array 的关系
把 Map 转为 Array
```javascript
// 会把 Map 转为 key-value 的 2D 数组
const array = [...map];
```
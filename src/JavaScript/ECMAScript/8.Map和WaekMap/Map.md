# Map

Map 是一组键值对的结构，用于解决以往不能用对象做为键的问题

- 具有极快的查找速度
- 函数、对象、基本类型都可以作为键
- Map 的 key 有顺序的，就是插入顺序。(可以用来实现LRU)

## 声明定义

1. 构造函数的方式

   ```javascript
   const map1 = new Map([
     ['string', '字符串作为 key'],
     [(a, b) => a + b, '函数作为 key'],
     [{ name: 'gdz', age: 18 }, '函数作为 key'],
   ]);

   console.log(map1);
   ```

2. `set(value)`

   ```javascript
   const map2 = new Map();
   map2.set(() => 3, 'sss');
   console.log(`map2`, map2);
   ```

说明：

- 对于键是对象的 `Map`， 键保存的是内存地址，值相同但内存地址不同的视为两个键。

## 获取数量

使用 `size` 属性，获取 Map 对象的成员数量

```javascript
map.size;
```

## 元素检测

`has(key)`

```javascript
map1.has('string'); // true
```

## 读取元素

`get(key)`

```javascript
map1.get('string'); // 字符串作为 key
```

## 删除元素

`delete(key)`

```javascript
map1.delete('string');
```

## 删除全部

`clear()`

```javascript
map1.clear();
```

## 遍历元素

Map 的遍历顺序就是插入顺序。

使用 `map.key() | map.values() | map.entries()` 都可以返回迭代对象

```javascript
const map1 = new Map([
  ['string', '字符串作为 key'],
  [(a, b) => a + b, '函数作为 key'],
  [{ name: 'gdz', age: 18 }, '函数作为 key'],
]);
console.log(map1.keys(), map1.values(), map1.entries());
// MapIterator {"string", ƒ, {…}}
// MapIterator {"字符串作为 key", "函数作为 key", "函数作为 key"}
// MapIterator {"string" => "字符串作为 key", ƒ => "函数作为 key", {…} => "函数作为 key"}
```

我们可以使用 `forEach()` 或者 `for of` 来遍历

```javascript
map1.forEach((value, index, map) => console.log(value, index, map));

for (const keyValue of map1.entries()) {
  console.log(keyValue);
}
```

## 数组转换

1. `[...map]`
2. `Array.from(map)`

```javascript
const map1 = new Map([
  ['string', '字符串作为 key'],
  [(a, b) => a + b, '函数作为 key'],
  [{ name: 'gdz', age: 18 }, '函数作为 key'],
]);

// 两种转换方式
const arr1 = [...map1];
const arr2 = Array.from(map1);
```

Map 转成 数组，处理完成之后再转回来

```javascript
const 值不能含有字符串 = new Map([...map1].filter((item) => !item[1].includes('字符串')));
console.log（值不能含有字符串）;
```

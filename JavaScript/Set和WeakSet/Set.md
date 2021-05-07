# Set
用来存储任何类型的唯一值，无论是基本类型还是对象引用

* 值是唯一的
* 只能保存值没有键名
* 便利顺序是添加的顺序，方便保存回调函数


## 基本使用
两种方式
1. 在构造的时候传递参数
    参数类型为 `Iterable<any>`
    ```javascript
    const set1 = new Set([1, 2, 3, 4]);
    console.log(set1) // { 1, 2, 3, 4 }
    ```
2. 通过 `set.add(value)` 的方式进行添加
    ```javascript
    const set2 = new Set()
    set2.add({ name: 1 })
    ```


## 获取数量
使用 `set.size` 属性获取


## 检测是否存在
使用 `set.has(value)` 方法判断


## 删除元素
使用 `set.delete(value)` 方法


## 清空所有元素
使用 `set.clear()` 方法


## 转换成数组
1. `Array.from(set)`
2. `[...set]`

```javascript
const set1 = new Set([1, 2, 3, 4]);

// 两种转换方式
const arr1 = [...set1];
const arr2 = Array.from(set1);
```

Set 转成 数组，处理完成之后再转回来
```javascript
const set3 = new Set('123456789');
const lte5 = new Set([...set3].filter(i => i <= 5));
console.log(lte5) // Set { '1', '2', '3', '4', '5' }
```

数组 转成 Set，处理完成之后再转回来
```javascript
const arr3 = [1, 2, 3, 4, 5, 3, 2, 1];
const uniqueArr3 = [...new Set(arr3)];
console.log(uniqueArr3) // [ 1, 2, 3, 4, 5 ]
```


## 遍历 Set 对象
使用 `set.values() | set.keys() | set.entries()` 都可以返回迭代对象
```javascript
const set4 = new Set([1, 2, 3, 4]);
console.log(set4.values(), set4.keys(), set4.entries())
// [Set Iterator] { 1, 2, 3, 4 }
// [Set Iterator] { 1, 2, 3, 4 }
// [Set Entries] { [ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 4 ] }
```

我们可以使用 `forEach()` 或者 `for of` 来遍历
```javascript
set4.forEach((value, index, arr) => console.log(value, index, arr));
// 1 1 Set { 1, 2, 3, 4 }
// 2 2 Set { 1, 2, 3, 4 }
// 3 3 Set { 1, 2, 3, 4 }
// 4 4 Set { 1, 2, 3, 4 }


for (const value of set4) {
  console.log(value)
}
// 1 2 3 4
```

## 并集，交集，差集
```javascript
const set5 = new Set([1, 2, 5, 6, 9]);
const set6 = new Set([1, 5, 9, 10, 8]);

const 并集 = new Set([...set5, ...set6]);
console.log(并集);

const 交集 = new Set([...set5].filter(i => !set6.has(i)))
console.log(交集);

const 差集 = new Set([...set5].filter(i => set6.has(i)));
console.log(差集)

```

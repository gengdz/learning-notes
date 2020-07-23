# Array

## 属性
1）length

## 方法
### `concat()`
**作用：1.合并两个或者多个数组 2.把值追加到数组中**
这个可以放心使用，不会改变原数组。

1）合并多个数组
```javascript
const num1 = [1, 2, 3],
    num2 = [4, 5, 6],
    num3 = [7, 8, 9];

const nums = num1.concat(num2, num3);
```

2）把值放在数组中。可以追加一个或者多个值
```javascript
const data = ['a', 'b', 'c'];
const concatSingleItem = data.concat('1'); // ['a', 'b', 'c', '1'];
const concatMultipleItem = data.concat('1','2','3'); // ["a", "b", "c", "1", "2", "3"];
```



### `some()`
数组中只要有一项满足断言条件就返回 `true`，否则就返回 `false`。（也就是说都不满足条件就返回 `false`)
```javascript
[1, 2, 3, 4].some(item => item > 10); // false
[{age: 3}, {age: 4}, {age: 5}].some(item => item.age < 4); // true
```



### `slice()`
`slice()` 方法返回一个新的数组对象，不会改变原数组。

函数签名如下：
```javascript
slice(begin?: number, end?: number);
```
> ==重要提示 ： 包含 begin，但是不包含end==
* 如果没有参数，那么会返回所有元素。
* 如果只有 *begin* 参数
    1. 如果为负数 (-n)，那么将返回 *从倒数第 n 个，到最后一个*。如果 n > = 数组的长度，则返回整个数组。
    2. 如果为正数（n), 那么将返回 *从第 n 个，到最后一个*。如果 n > = 数组的长度，那么将返回空数组。
* 如果有 *end* 参数
    1. 如果为负数（-n)，表示：在倒数第 n 个元素结束。如果 n > = 数组的长度，则返回空数组 []。
    2. 如果为正数（n)，表示：在 第 n 个元素结束。如果 n > = 数组的长度，那么也会一直提取到原数组尾部。

```javascript
const data = ['a', 'b', 'c', 'd', 'e'];
data.slice(); // ["a", "b", "c", "d", "e"]
data.slice(2); // ["c", "d", "e"]
data.slice(-2) //  ["d", "e"]
data.slice(10) // []
data.slice(-10) // ["a", "b", "c", "d", "e"]

data.slice(2, -2) // ["c"]
data.slice(2, 4) // ["c", "d"]
data.slice(2, 10) // ["c", "d","e"]
data.slice(2, -10) // []
```
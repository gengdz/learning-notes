# Array

## 属性
* length

## 方法
### `concat()`
**作用：1.合并两个或者多个数组 2.把值追加到数组中**
这个可以放心使用，不会改变原数组。

1) 合并多个数组
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
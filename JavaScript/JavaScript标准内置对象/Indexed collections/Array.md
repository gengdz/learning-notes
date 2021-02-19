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

### `reduce`
`reduce()` 表示这个是一个归约操作。

#### 方法签名
```javascript
array.reduce(callback(accumulator, currentValue, currentIndex, sourceArray), initialValue)

// 输出值
函数累计处理的结果
```
**callback 参数解析**
* `accumulator`: 累计器累计回调的返回值; 它是上一次调用回调时返回的累积值
* `currentValue`: 当前值
* `currentIndex`: 当前值的索引
* `sourceArray`: 源数组(调用 redece 方法的数组)。


**返回值**
* **每次归约操作都需要有返回值**，尤其是在条件判断中，一定记得这句话

#### 示例
```javascript

// 数组压平
const flattened = [[0, 1], [2, 3], [4, 5]].reduce(
 ( acc, cur ) => acc.concat(cur),
 []
);

// 有条件判断
const names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];
const countedNames = names.reduce((allNames, name) => { 
  if (name in allNames) {
    allNames[name]++;
  }
  else {
    allNames[name] = 1;
  }
  return allNames; // 注意这个，每次都要有返回值
}, {});

// countedNames is:
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
```



### `map`
map表示遍历，这里说明一个情况。

```javascript
const f = x => x + 1;
const g = x => x * 2;
const data = [1, 2, 3, 4];

// 这种方式会遍历两次
const transformData = data.map(f).map(g);

// 可以使用 map + compose 的方式达到遍历一次的目的
const composeData = data => data.map(compose(g, f));


// 还可以使用 R.transduce 的方式，达到遍历一次的目的
const transducer = R.compose(
    R.map(f),
    R.map(g)
  );
const transduceData = R.transduce(transducer, R.flip(R.append), []);
```


#### `map` 问答
Q：`array.map().map()` 会遍历几次？
A：会遍历两次。第一次 `map()` 之后生成一个新的 *mapArray*, 然后再进行一个 `map()`，生成最终的结果数组。
  类似的还有：`array.filter().map()`，也是遍历了两遍。

Q：我就是想遍历一次，我应该怎么做？
A：1. 可以使用 `map() + compose()` 的方式； 2. 可以使用 `transduce()` 的方式


# Array
## reduce
`reduce()` 表示这个是一个归约操作。

### 方法签名
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

### 示例
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

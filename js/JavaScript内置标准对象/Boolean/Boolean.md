# Boolean

`Boolean` 对象是一个布尔值的对象包装器。
它是一个 "function" 类型。

## 用法
它可以将第一个参数的值转换为布尔值。如果是 `0`, `-0`, `null`, `undefined`, `false`, `NaN`, 或者 `""`，将被转换为 `false`。其余的将被转换为 `true` 


它可以这么用！
```javascript
const arrContainsEmptyVal = [3, 4, 5, 2, 3, undefined, null, 0, ""];

const compact = array => array.filter(Boolean); 
```

注意：
不要用创建 `Boolean` 对象的方式将一个非布尔值转化成布尔值，直接将 `Boolean` 当做转换函数来使用即可，或者使用双重非`（!!）`运算符：

```javascript
const x = Boolean(expression);     // 推荐
const x = !!(expression);          // 推荐
const x = new Boolean(expression); // 不太好
```





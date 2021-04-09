# Number

## 数学公式

### Math.random()
取随机数 `Math.random()`，产生的值为（0 <= value < 1）

示例1：0-5 之间的随机数
```javascript
const randomNum = Math.floor(Math.random() * (5 + 1));
```
示例2：2-5 之间的随机数
```javascript
// 2-5 范围是 [2,3,4,5]
// min + Math.floor(Math.random() * (max - min + 1))
const rangeNum = 2 + Math.floor(Math.random() * (5 - 2 + 1));
```



### Math.floor()，Math.ceil()

```javascript
const ceilNum = Math.ceil(3.2) // 4
```

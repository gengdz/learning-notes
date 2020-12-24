# Composable Functional Javascript
> 本篇内容主要是参考自
> * [Professor Frisby Introduces Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)
> * [深入学习javascript函数式编程](https://juejin.cn/post/6844903743499026446)
> * [JavaScript 函数式编程（三）](https://juejin.cn/post/6844903655397834765)



## 容器（Box)
自己实现一个 Box
```javascript
// 自己实现一个类似Array的Box
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

// of 方法
Box.of = x => Box(x);
```
> 函数式编程一般约定，函子有一个 of 方法，用来生成新的容器
```javascript
Box(1) === Box.of(1)
```

下面就这么这么用
```javascript
const nextCharForNumberString = str =>
  Box(str)
    .map(s => s.trim())
    .map(s => parseInt(s))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .inspect();

const result = nextCharForNumberString(' 64');
console.log(result); // "Box(A)"
```

### 使用Box重构代码
```javascript
const moneyToFloat = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r))

console.log('Box式', moneyToFloat('$5.00').fold(x => x))

const percentToFloat = str =>
  Box(str)
    .map(str => str.replace(/\%/g, ''))
    .map(replaced => parseFloat(replaced))
    .map(number => number * 0.01);

console.log('Box式', percentToFloat('20%').fold(x => x))

const applyDiscount = (price, discount) =>
  moneyToFloat(price)
    .fold(cost =>
      percentToFloat(discount)
        .fold(discount => cost - cost * discount)
    )
console.log('Box式', applyDiscount('$5.00', '20%'))

```

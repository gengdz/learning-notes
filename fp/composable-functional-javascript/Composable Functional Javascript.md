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



## Either
同步分支使用 `Either`。`Either` 由两部分组成，`Left | Right`。

### Right
```javascript
const Right = x => ({
  map: f => Right(f(x)),
  chain: f => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})
Right.of = x => Right(x);

```
### Left
```javascript
const Left = x => ({
  map: f => Left(x),
  chain: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`
})
Left.of = x => Left(x);

```

### Either提供一些方法
```javascript
const fromNullable = x => (x != null || x != undefined) ? Right(x) : Left(x)

const tryCatch = f => {
  try {
    return Right(f())
  } catch (e) {
    return Left(e)
  }
}
```

### 使用 chain 解决 Either 嵌套问题
```javascript
// 命令式代码
const streetName = user => {
  const address = user.address;
  if (address) {
    const street = address.street;
    if (street) {
      return street.name;
    }
  }
  return 'no street';
};

// fp
const streetNameFp = user =>
  fromNullable(user.address)
    .chain(address => fromNullable(address.street))
    .chain(s => fromNullable(s.name))
    .fold(() => 'no street', name => name)


const user = {
  address: {
    street: {
      name1: '道路名称'
    }
  }
}
const street = streetNameFp(user);
console.log('stree', street) // 'no street'

```


## 半群
半群是一种具有 `concat` 方法的类型，要求 `concat` 方法满足结合律。
举例：`Array | String`
> 结合律：

# Composable Functional Javascript

## 容器（Box)
自己实现一个 Box
```javascript
// 自己实现一个类似 Array 的 Box
const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`
})

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


Box 中不仅可以放数据也可以放函数

```javascript
const Box = x => ({
  // map: f => Box(f(x)),
  fold: f => f(x),
  toString: () => `Box(${x})`
});

const f0 = x => x * 100; // think fo as a data
const add1 = f => x => f(x) + 1; // think add1 as a function
const add2 = f => x => f(x) + 2; // think add2 as a function

const g = Box(f0)
.map(f => add1(f))
.map(f => add2(f))
.fold(f => f);

const res = g(1);
console.log(res); // 103

```

### 使用 Box 重构代码
```javascript
const moneyToFloat = str =>
  parseFloat(str.replace(/\$/g, ''));

console.log('命令式', moneyToFloat('$5.00'))

const moneyToFloat = str =>
  Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r))

console.log('Box式', moneyToFloat('$5.00').fold(x => x))
```

```javascript
const percentToFloat = str => {
  const replaced = str.replace(/\%/g, '');
  const number = parseFloat(replaced);
  return number * 0.01;
};

console.log('命令式', percentToFloat('20%'))

const percentToFloat = str =>
  Box(str)
    .map(str => str.replace(/\%/g, ''))
    .map(replaced => parseFloat(replaced))
    .map(number => number * 0.01);

console.log('Box式', percentToFloat('20%').fold(x => x))

```

```javascript
const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price);
  const savings = percentToFloat(discount);
  return cost - cost * savings;
};
console.log('命令式', applyDiscount('$5.00', '20%'))

const applyDiscount = (price, discount) =>
  moneyToFloat(price)
    .fold(cost =>
      percentToFloat(discount)
        .fold(discount => cost - cost * discount)
    )
console.log('Box式', applyDiscount('$5.00', '20%'))

```



### Functor（函子）
Functor 是实现了 map 函数并遵守一些特定规则的容器类型


特定规则是指
1. **同一性** `u.map(id) === id(u)`
```javascript
const id = x => x;
u.map(id) === id(u);

const r1 = Box(5).map(id); // Box(5)
const r2 = Box(5) => Box(5); // Box(5)

Box(5).map(x => x) === Box(5);
```

2. **组合性** `u.map(x => f(g(x))) === u.map(g).map(f)`
```javascript
u.map(x => f(g(x))) === u.map(g).map(f);

const add = x => x + 1;
const multiply = x => x * 2;
Box(5).map(x => add(multiply(x))) === Box(5).map(multiply).map(add)
```



### Pointed Functor
Pointed Functor 是具有 of 方法的 Functor
> 函数式编程一般约定，函子有一个 of 方法，用来生成新的容器

```javascript
// of 方法
Box.of = x => Box(x);
Box(1) === Box.of(1)
```




## Either

### 背景
假设我们要：获取对应颜色的十六进制的 RGB 值，并返回去掉 # 后的大写值。

```javascript
const findColor = (name) => ({
  red: '#ff4444',
  blue: '#3b5998',
  yellow: '#fff68f',
})[name]

const redColor = findColor('red')
  .slice(1)
  .toUpperCase() // FF4444

const greenColor = findColor('green')
  .slice(1)
  .toUpperCase()
// Uncaught TypeError:
// Cannot read property 'slice' of undefined

```


### 函数式解决方案
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

### Either 提供一些方法
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



解决背景中的问题
```javascript
const findColor = (name) => fromNullable({
  red: '#ff4444',
  blue: '#3b5998',
  yellow: '#fff68f',
})[name];

const greenColor = findColor('green')
  .map(c => c.slice(1))
  .fold(e => 'no color', c => c.toUpperCase())
```



### 使用 chain 解决 Either 嵌套问题
就是定义一个 chain 方法，就是当我知道这里要返回容器了，就不要再用容器包裹了。
```javascript
const Right = x => ({
  map: f => Right(f(x)),
  chain: f => f(x),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`
})
```

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

### 使用 Either 重构代码
```javascript
const wrapExamples = example => {
  if (example.previewPath) {
    try {
      example.preview = fs.readFileSync(example.previewPath);
    }
    catch (e) {}
  }
  return example;
};


const wrapExamples = example => 
  fromNullable(example.previewPath)
    .chain(path => tryCatch(() => fs.readFileSync(path)))
    .fold(() => example,  preview => Object.assign({preview}, example))

```



### Monad（单子）
> Monad 是实现了 chain 方法，并遵循一些特定规则的容器类型

// TODO 补充特定规则




## Semigroup（半群）
> 定义一：对于非空集合 S，若在 S 上定义了二元运算 ○，使得对于任意的 a, b ∈ S,有 a ○ b ∈ S，则称 {S, ○} 为广群。

> 定义二：若 {S, ○} 为广群，且运算 ○ 还满足结合律，即：任意 a, b, c ∈ S，有 (a ○ b) ○ c = a ○ (b ○ c)，则称 {S, ○} 为半群。

举例来说，JavaScript 中有 concat 方法的对象都是半群
```javascript
// 字符串和 concat 是半群
'1'.concat('2').concat('3') === '1'.concat('2'.concat('3'))

// 数组和 concat 是半群
[1].concat([2]).concat([3]) === [1].concat([2].concat([3]))

```

虽然理论上对于 <Number, +> 来说它符合半群的定义：
* 数字相加返回的仍然是数字（广群）
* 加法满足结合律（半群）

### <Number, +> 组成的半群 Sum
```javascript
const Sum = x => ({
  x,
  concat: ({x: y}) => Sum(x + y),
  inspect: () => `Sum(${x})`,
})

Sum(1)
  .concat(Sum(2))
  .inspect() // Sum(3)
``` 


### <Boolean, &&> 组成的半群 All
```javascript
const All = (x) => ({
  x,
  concat: ({ x: y }) => All(x && y), // 采用解构获取值
  inspect: () => `All(${x})`,
})

All(true)
  .concat(All(false))
  .inspect() // All(false)

```


## Monoid（幺半群）
> 幺半群是一个存在单位元的半群

单位元的定义如下
> 单位元：对于半群 <S, ○>，存在 e ∈ S，使得任意 a ∈ S 有 a ○ e = e ○ a

举例来说，对于数字加法这个半群来说，0 就是它的单位元，所以 <Number, +, 0> 就构成一个幺半群。同理：

* 对于 <Number, *> 来说单位元就是 1
* 对于 <Boolean, &&> 来说单位元就是 true
* 对于 <Boolean, ||> 来说单位元就是 false
* 对于 <Number, Min> 来说单位元就是 Infinity
* 对于 <Number, Max> 来说单位元就是 -Infinity


其实看到幺半群的第一反应应该是默认值或初始值，例如 reduce 函数的第二个参数就是传入一个初始值或者说是默认值。

```javascript
// sum
const Sum = (x) => ({ ... })
Sum.empty = () => Sum(0) // 单位元

const sum = xs => xs.reduce((acc, cur) => acc + cur, 0)

sum([1, 2, 3])  // 6
sum([])         // 0，而不是报错！

// all
const All = (x) => ({ ... })
All.empty = () => All(true) // 单位元

const all = xs => xs.reduce((acc, cur) => acc && cur, true)

all([true, false, true]) // false
all([])                  // true，而不是报错！

// first
const First = (x) => ({ ... })

const first = xs => xs.reduce(acc, cur) => acc)

first(['steve', 'jame', 'young']) // steve
first([])                         // boom!!!

```



## LazyBox
只要不调用 fold 方法，它就不会执行，在此之前，我们可以一直调用 map 给它分配任务。

```javascript
const LazyBox = (g) => ({
  map: f => LazyBox(() => f(g())),
  fold: f => f(g())
})

const result = LazyBox(() => ' 64 ')
  .map(s => s.trim())
  .map(i => parseInt(i))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
  // 没有 fold 死活不执行

result.fold(c => c.toLowerCase()) // a

```
LazyBox 的参数是一个参数为空的函数




## Task
首先 Task 的构造函数可以接收一个函数以便延迟计算，当然也可以用 of 方法来创建实例，很自然的也有 map、chain、concat、empty 等方法。
与众不同的是它有个 fork 方法（类似于 LazyBox 中的 fold 方法，在 fork 执行前其他函数并不会执行），以及一个 rejected 方法，类似于 Left，忽略后续的操作。


### 使用示例
```javascript
const Task = require('data.task');

const launchMissiles = () =>
  // 和 Promise 很像，不过 Promise 会立即执行
  // 而且参数的位置也相反
	new Task((rej, res) => {
      console.log('launch missiles!');
      res('missile');
	});


// 继续对之前的任务添加后续操作（duang~给飞弹加特技！）
const app = lauchMissiles()
  .map(x => x + '!')

// 这时才执行（发射飞弹）
app.fork(showErr, showSuc)

```

### 原理
将有副作用的代码给包起来之后，这些新函数就都变成了纯函数，这样我们的整个应用的代码都是纯的~，并且在代码真正执行前（fork 前）还可以不断地 compose 别的函数，为我们的应用不断添加各种功能，这样一来整个应用的代码流程都会十分的简洁漂亮。


### 使用 Task 处理异步任务

```javascript
import fs from 'fs'

const app = () => (
  fs.readFile('config1.json', 'utf-8', (err, contents) => {
    if (err) throw err

    const newContents = content.replace(/8/g, '6')

    fs.writeFile('config2.json', newContents, (err, _) => {
      if (err) throw err

      console.log('success!')
    })
  })
)

```
使用 Task 改造
```javascript
import fs from 'fs'
import Task from 'data.task'

const cfg1 = 'config1.json'
const cfg2 = 'config2.json'

const readFile = (file, enc) => (
  new Task((rej, res) =>
    fs.readFile(file, enc, (err, str) =>
      err ? rej(err) : res(str)
    )
  )
)

const writeFile = (file, str) => (
  new Task((rej, res) =>
    fs.writeFile(file, str, (err, suc) =>
      err ? rej(err) : res(suc)
    )
  )
)

const app = readFile(cfg1, 'utf-8')
  .map(str => str.replace(/8/g, '6'))
  .chain(str => writeFile(cfg2, str))

app.fork(
  e => console.log(`err: ${e}`),
  x => console.log(`suc: ${x}`)
)


```




##  参考资料
> 本篇内容主要是参考自
> * [Professor Frisby Introduces Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)
> * [深入学习javascript函数式编程](https://juejin.cn/post/6844903743499026446)
> * [JavaScript 函数式编程（三）](https://juejin.cn/post/6844903655397834765)


# this
调用函数时 this 会隐式传递给函数。函数调用时的关联对象，也称为函数的上下文



## 函数调用
**全局环境下 this 指向 window 对象。 严格模式下，this 为 undefined。**



## 方法调用
函数作为对象的属性或者类的属性时，我们称之为方法。
**函数作为对象的方法时 this 指向该对象**
有多种形式创造对象



### 对象字面量

```javascript
const person1 = {
  name: 'gdz',
  sayHello() {
    console.log(`你好，${this.name}`, this); // 指向 person1

    function f1(params) {
      console.log('f1 的 this', this) // 这里就指向了 window ,它不是对象的方法，就是普通的函数，那么就指向了 window
    }
    f1()

    const f2 = () => {
      console.log(this) // 这就会向上找
    }
    f2();
  }
}

person1.sayHello()
```



### 构造函数

函数当被 new 的时候就是构造函数，一般构造函数中含有属性和方法，函数中的上下文指向实例对象

里面的 this 默认就是指当前对象

```javascript
function User(name) {
  this.name = name;
  this.sayHello = function () {
    console.log(`你好，${this.name}`, this);

    function f1(params) {
      console.log('f1 的 this', this) // 这里就指向了 window ,它不是对象的方法，就是普通的函数，那么就指向了 window
    }
    f1()

    const f2 = () => {
      console.log(this)
    }
    f2();
  }
}

const lisi = new User('李四');
lisi.sayHello();
```



## 箭头函数

箭头函数没有 this 箭头函数会继承父作用域的 this 

```js
const obj = {
  qianzhui: 'good',
  lists: ['js', 'ts', 'react'],
  show() {
    return this.lists.map(function (title) {
      console.log('map里面的this', this)
      // 这里的函数是普通的函数，所以它的 this 指向是 window
      return `${this.qianzhui}-${title}`;
    });
  },
  arrowShow() {
    return this.lists.map((title) => {
      console.log('map里面的this', this)
      // 这里的函数是 箭头函数，所以它的 this 继承自父亲，也就是 arrowShow，那么就是这个对象本身
      return `${this.qianzhui}-${title}`;
    });
  }
}

console.log(obj.show());
console.log(obj.arrowShow());
```



## 回调函数

`addEventListener(type, listener)` 

```javascript
const dom = {
  user: 'gdz',
  bind() {
    const button = document.querySelector('button');
    // button.addEventListener('click', (event) => {
    //   console.log(this) // 这里指向了 bind 中的 this 也就是 dom
    // })
    button.addEventListener('click', function (event) {
      console.log(this) // 这里指向了 button
    })
  }
}

dom.bind()
```



## 改变 this
在 EcmaScript 中函数也是对象，也有属性和方法。这里重点说 3 个 `call()`、`apply()`、`bind()`。

* 作用是：改变函数执行时的 this 指向。
* 核心理念是：借用方法
* 只有函数才有这几个方法




### `call()`

函数签名如下
```javascript
fun.call(thisArg, param1, param2, ...)
```
**会立即执行函数**

使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。
`call()` 方法第一个参数同样是 this 的值，接收参数的方式为直接把参数传递给函数

```javascript
function sum(num1, num2) {
    return num1 + num2;
}
function callSum(num1, num2) {
    return sum.call(this, num1, num2);
}

alert(callSum(10, 10);   // 20
      
```

这几个函数真正用武之地不是传递参数而是扩充函数赖以运行的作用域

```javascript
window.color = "red";
const o = {color: "blue"};

function sayColor() {
    alert(this.color);
}

sayColor();   // "red"

sayColor.call(this);   // "red"
sayColor.call(window);   // "red"
sayColor.call(o);   // "blue"
```



### `apply()` 

函数签名如下
```javascript
fun.apply(thisArg, [param1,param2,...])
```
**会立即执行函数**

使用调用者提供的 this 值和参数调用该函数的返回值。若该方法没有返回值，则返回 undefined。
`apply()` 方法接受两个参数：第一个为在其中运行的函数的作用域，第二个为参数数组

```javascript
function sum(num1, num2) {
    return sum1 + sum2;
}
function callSum1(num1, num2) {
    return sum.apply(this, arguments);
}
function callSum2(num1, num2) {
    return sum.apply(this, [num1, num2]);
}

alert(callSum1(10, 10));   //20
alert(callSum2(10, 10));   //20

```



### `bind()`

函数签名如下
```javascript
fun.bind(thisArg, param1, param2, ...)
```

**会返回一个新的函数**

* `bind` 会返回一个原函数的拷贝，并拥有指定的 this 值和初始参数。
* 在 `bind()` 被调用的时候，新函数的 this 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
如果 `thisArg` 是 `null` 或者 `undefined`, 执行作用域的 `this` 将被视为新函数的 `thisArg` 
* `const bindFn =  fn.bind(undefined, ...args)`中 `bindFn` 是一个函数，这个函数的长度为 `fn.length - args.length`

下面是 `bind()` 函数的使用示例
改变 this 指向。

```javascript
window.color = "red";
const o = {color: "blue"};

function sayColor() {
    alert(this.color);
}
sayColor() // 'red'
var objectSayColor = sayColor.bind(o);
objectSayColor();   // "blue"

```

类似 柯里化 
```javascript
const sum = (a, b, c) => a + b + c;

const bindSum1 = sum.bind(undefined, 1);
const bindSum2 = bindSum1.bind(undefined, 2);
console.log('bindSum111的长度是：', bindSum1.length); // 2
console.log('bindSum222的长度是：', bindSum2.length); // 1
```


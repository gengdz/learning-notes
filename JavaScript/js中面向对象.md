# js中面向对象

面向对象是指：**封装**，**继承**，**多态**；

> <dfn>封装</dfn>：把客观事物封装成抽象的类，隐藏属性和方法的实现细节，仅对外提供接口。

> <dfn>继承</dfn>：子类可以使用父类的所有功能，并且对这些功能进行拓展。继承就是从一般到特殊的过程。

> <dfn>多态</dfn>：由继承而产生了相关的不同的类。对同一个方法有不同的响应。狗和猫都是动物吃饭的行为不同

es5中没有class的概念，为了实现面向对象，采取了一种比较曲折的方式（分为以下几步）：1.给function添加了一个*protrotype* 属性，2.使用函数来代替class的方式。



## 新建一个类

在js中新建一个类只需要写一个函数就可以实现

```javascript
// 新建一个Puppy类
function Puppy() {}

// 然后可以使用new关键字生成实例对象
const myPuppy = new Puppy();

// 现在的问题是：1.我们没有构造函数不能设置小狗的年龄 2.我们没有实例方法
```



## 函数本身就是构造函数

当做类使用的函数，它本身就是构造函数。我们可以让它接受参数就可以解决问题1

```javascript
function Puppy(age) {
  this.age = age;
} 

const myPuppy = new Puppy(2);
```

上面当作类使用的函数里面的this总是指向实例对象，这么设计的目的让使用者可以通过构造函数给实例对象设置属性。



## 类方法的两种实现方式

上面实现了类和构造函数。如何实现类方法呢？js给出的两种方案是：

1. **给function添加了一个*prototype* 的属性，挂载到这上面的方法或者属性，在实例化的时候，会给到实例对象。**
2. **把方法写在构造函数内，我们可以称之为*函数内方法***

```javascript
// 1.prototype的方式给Puppy增加类方法
Puppy.prototype.say = function() {
  console.log(`hello, my age is ${this.age}`)
}

// 2.把方法写在构造函数内
function Puppy(age) {
  this.say = function() {
    console.log(`hello, my age is ${this.age}`)
  }
} 

```

两种方式的使用场景和比较：

| 方式            | 使用场景           | 优点                                                         |
| --------------- | ------------------ | ------------------------------------------------------------ |
| prototype的方式 | 不变的属性和方法   | 可以节省内存：<small>原型链上面的属性会被多个实例共享，构造函数不会</small> |
| 函数内方法      | 需要使用到私有变量 | 不会暴露私有变量                                             |



## 实例对象怎么使用类方法呢？

这就该**\__proto__**登场了。

当你访问对象上没有的属性时，比如`myPuppy.say`，对象会去\__proto__上去查找，\__proto__ 的值就等于父类的*prototype*。 `myPuppy.__proto__`指向了`Puppy.prototype`。

如果你访问的属性在`Puppy.prototype`也没有，那么就会去`Puppy.prototype.__proto__`上找，这个时候其实就找到了`Object.prototype`了，`Object.prototype`再往上找就没了，也就是null，**这就是原型链！！！**

```javascript
myPuppy.__proto__ === Puppy.prototype // true

Puppy.prototype.__proto__ === Object.prototype // true
```



## constructor

一般constructor是指 **类的`prototype.constructor`**。`prototype.constructor`是prototype上的一个保留属性，**这个属性就指向函数本身**，用于指示当前类的构造函数。

```javascript
Puppy.prototype.constructor === Puppy // true
```



## 静态属性和方法

静态属性和方法的实现方式是：**直接将它作为类函数的属性就行了。**

```javascript
// 定义一个静态方法
Puppy.staticFunc = function () {
  console.log('这是类的静态方法')
}

// 定义一个静态属性
Puppy.staticColor = 'black'; 

// 调用方式
Puppy.staticFunc()
```



## 继承

实现继承就是要做到：**让子类拥有父类的方法和属性。** 其中方法和属性有两个来源，一个是类函数内部的，一个是prototype上的。

```javascript
function Person(name, age) {
  // 通过构造函数的方式增加属性和方法
  this.name = name
  this.age = age
  this.run = function () {
    return `${this.name}在运动`
  }
}

// 通过原型的方式增加属性和方法
Person.prototype.sex = '男'
Person.prototype.work = function () {
  return `${this.name}在工作`
}

// 1.对象冒充的方式实现继承
function Robot1(name, age) {
  /* 
    这里使用对象冒充实现继承 
    对象冒充可以继承构造函数里面的属性和方法，但是没法继承原型链上面的属性和方法
  */
  Person.call(this, name, age)
}

const robot1 = new Robot1('李四', 24)
console.log(robot1.name, robot1.age, robot1.sex)


/* 
  2.原型链实现继承
  只能继承属性链上面的属性和方法,但是无法继承构造函数的属性和方法
*/
function Robot2() { }
Robot2.prototype = new Person()

const robot2 = new Robot2('王五', 25)
console.log(robot2.name, robot2.age, robot2.sex, robot2.work())


// 3.组合继承
function Robot3(name, age) {
  Person.call(this, name, age)
}
// Robot3.prototype = new Person()
Robot3.prototype = Person.prototype

const robot3 = new Robot3('赵六', 66)
console.log(robot3.name, robot3.age, robot3.sex, robot3.run(), robot3.work())
```


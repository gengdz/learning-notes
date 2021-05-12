# ES5 中的类和继承

## ES5 中实现类和继承

```javascript
// ES5里面的类
function Person(name, age) {
  // 通过构造函数的方式增加属性和方法
  this.name = name
  this.age = age
  this.run = function () {
    return `${this.name}在运动`
  }
}

// 通过原型的方式增加属性和方法 区别是原型链上面的属性会被多个实例共享，构造函数不会
Person.prototype.sex = '男'
Person.prototype.work = function () {
  return `${this.name}在工作`
}

Person.getInfo = function () {
  console.log('这是类的静态方法')
}

const p1 = new Person('张三', 20)
console.log(p1.name, p1.age, p1.sex, p1.run(), p1.work())
Person.getInfo()




// 对象冒充的方式实现继承
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
  原型链实现继承
  只能继承属性链上面的属性和方法,但是无法继承构造函数的属性和方法
*/
function Robot2() { }
Robot2.prototype = new Person()
const robot2 = new Robot2('王五', 25)
console.log(robot2.name, robot2.age, robot2.sex, robot2.work())


// 组合继承
function Robot3(name, age) {
  Person.call(this, name, age)
}
// Robot3.prototype = new Person()
Robot3.prototype = Person.prototype
const robot3 = new Robot3('赵六', 66)
console.log(robot3.name, robot3.age, robot3.sex, robot3.run(), robot3.work())
```


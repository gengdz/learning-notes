# Decorator的用法

## 装饰器是什么？

装饰器是本质一种函数，写成 `@ + 函数名`，它可以放在`类`、``类方法``、`类属性`的前面。==它不可以作用于函数上==。装饰器的实现是通过 **闭包** 的方式。装饰器、高阶组件、闭包存在着密切的关系。

装饰器会默认把 **装饰对象** 当做最后一个参数传递到装饰器函数中

## 装饰器的作用？

通过一种非侵入的形式。增强类和类方法的功能。

## 类的装饰器

一、首先来一个普通的装饰器

```javascript
// 为类添加一个静态属性
const testable = (target) => {
    console.log(target)
    target.isTestable  = false
}

@testable
class MyTestableClass {
  // ...
}

MyTestableClass.isTestable // true
```



二、来一个复杂点的装饰器

```javascript
// 为类添加一个实例属性，通过操作目标类的prototype对象实现。
const testable => isTestable => target =>  target.prototype.isTestable = isTestable

@testable(true)
class MyTestableClass {}
let obj = new MyTestableClass();
obj.isTestable // true

```

## 类属性的装饰器

类属性的装饰器有两个参数

* target: 对静态成员来说是类的构造函数，对实例对象来说是类的原型对象
* name: 所修改的属性名

代码示例

```typescript
class Person {
  @value('耿德洲')
  public name: string | undefined;

  public sayHi() {
    return `${this.name}`
  }
}

function value(params:string){
  return function (target: any, name:string){
    target[name] = params
  }
}

const p = new Person()
console.log(p.sayHi())

// 耿德洲
```





## 类方法的装饰器

类方法的装饰器有三个参数

* target: 对静态成员来说是类的构造函数，对实例对象来说是类的原型对象
* name: 所修饰的属性名
* descriptor: 属性的描述对象

如果使用原型或者继承的方式修改sayHi会编译不通过。

类方法的装饰器代码如下

```typescript
class Person {
  public name: string | undefined;

  @readonly
  public sayHi() {
    return `${this.name}`
  }
}

// Person.prototype.sayHi = function () {
//   return `aaaaa`
// }

function readonly(target: any, name: string, descriptor: any) {
  descriptor.writable = false;
  console.log('descriptor', descriptor)
  return descriptor;
}

const p = new Person()
p.name = 'gdz'
console.log(p.sayHi())

/* 
  descriptor {
    value: [Function],
    writable: false,
    enumerable: true,
    configurable: true
  } 
 */
```


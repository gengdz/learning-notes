
# Class
类是对一件事物的抽象。里面有属性和方法。

对象是类的实例。`obj = new Animal()`

面向对象有三大特性：`封装`、`继承`、`多态`

## 类、继承、多态

### ts中的类
```typescript
// ts中的类
class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name
  }
  static nikeName: string = '小动物'
  getName(): string {
    return this.name
  }
  setName(name: string): void {
    this.name = name
  }
  sayHi(): string {
    return `my name is ${this.name}`
  }  
  static eat() {
    return `${this.nikeName}在吃东西`
  }
}

let a1 = new Animal('张三')
console.log(a1.getName())
a1.setName('张三的小名')
console.log(a1.sayHi())
console.log(Animal.nikeName)
console.log(Animal.eat())

// 张三
// my name is 张三的小名
// 小动物
// 小动物在吃东西
```



### ts中的继承
```typescript
// 类的继承，通过 extends、constructor、super 实现
class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
  sayHi() {
    return `我是Dog类，我的名字是${this.getName()}`
  }
}

let dog = new Dog('狗子')
dog.setName('小狗子')
console.log(dog.sayHi())
console.log(Dog.nikeName)
console.log(Dog.eat())

// 我是Dog类，我的名字是小狗子
// 小动物
// 小动物在吃东西
```



### 多态
什么是多态？**父类定义一个方法，不去子类去实现。每个子类有不同的表现。多态属于继承的范畴**

```typescript
// Dog类继承了Animal,实现了sayHi方法
class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
  sayHi() {
    return `我是Dog类，我的名字是${this.getName()}`
  }
}

// Cat类继承了Animal,也实现了sayHi方法
class Cat extends Animal {
  constructor(name: string) {
    super(name)
  }
  sayHi() {
    return `我是Cat类，我的名字是${this.getName()}`
  }
}

let dog = new Dog('狗子')
console.log(dog.sayHi())

let cat = new Cat('猫咪')
console.log(cat.sayHi())

// 我是Dog类，我的名字是小狗子
// 我是Cat类，我的名字是猫咪

```



## 抽象类和抽象方法
一、为什么会出现抽象类和抽象方法？

***用来定义规范*** 。**父类定义了一些方法，他要求继承他的所有子类都实现这些方法**，在这个场景下就使用抽象类和抽象方法。

抽象类不能不能被实例化，只能继承他。继承了他就要重写他的抽象方法

二、代码示例
```typescript
// 抽象方法和抽象类
abstract class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  abstract eat(): string
}

class Student extends Person {
  eat() {
    return `${this.name}同学在食堂吃饭`
  }
}

const student = new Student('耿德洲')
console.log(student.eat())
// 耿德洲同学在食堂吃饭
```



## 类和接口的关系
接口的另一个作用：对类的部分行为进行抽象。

```typescript
interface Alarm {
  alert(name: string, age: number): string;
  log?(): boolean;
}

interface Light {
    lightOn(): void;
    lightOff(): void;
}

class Door {
}

class Car extends Door implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

说明：
1. ts中类是单继承。
2. 类可以实现多个接口。
3. 接口可以继承接口




## 类里面的修饰符
| 修饰符              | 范围                                           |
| ------------------- | ---------------------------------------------- |
| publice(公有)       | 在类里面、子类、类外面都可以访问。<br />默认值 |
| protected(保护类型) | 在类里面、子类可以被访问                       |
| private(私有)       | 在类里面可以被访问                             |


## 静态方法和静态属性。
什么时候使用静态方法和属性？
1. **当方法或者属性不依赖具体实例**，可以使用。这样可以避免每次创建对象都会生成一份该方法或属性的拷贝，从而节省内存。比如：在 Person 类中打印一共创建了多少个实例了。也就是不要使用 this。
2. **当某个方法或者属性需要在整个应用程序被共享时**，可以使用。这样可以通过类名类访问，无需创建对象。


* 静态属性也被称为类属性
* 静态方法中不能使用 this
* 静态属性和方法可以被继承
* 静态方法中只能使用静态属性
* 类的方法中可以直接使用该类的静态属性和方法

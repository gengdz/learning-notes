# interface-Object-Array
[toc]

## interface
什么是 *interface* ?
**接口是对行为的抽象。具体的实现需要类去实现。 *用来定义更严格的规范***

在 TS 中，interface 用来：
* 对 *对象的形状* 进行描述
* 对 *类的一部分行为* 进行抽象



### 定义对象的形状
```typescript
interface PersonA {
  readonly id: number;
  name: string;
  age: number;
  favoriteFood?: string[]; // 可选属性
  [propName: string]: string | number | string[]; // 任意属性
}

const tom: PersonA = {
  name: 'tom',
  age: 16,
}
console.log(tom)
```



### 定义函数的形状
```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function (source, subString) {
  return source.search(subString) !== -1;
}
console.log(mySearch('mySearch', 'my')) // true

```



### 定义数组的形状
```typescript
// 使用接口来表示数组 (一般用于类数组)
interface NumberArray {
  [index: number]: number;
}

let fibonacci: NumberArray = [1, 1, 2, 3, 5]
```



### 接口继承接口，类实现接口

```typescript
// 接口继承接口，类实现接口
interface Cap {
  showColor(): string
}

interface BoliCap extends Cap {
  showName(): string
}

class MyCap implements BoliCap {
  name: string;
  color: string;
  constructor(name: string, color: string) {
    this.name = name;
    this.color = color
  }
  showColor(){
    return  `杯子的颜色:${this.color}`
  }
  showName(){
    return `杯子的名字: ${this.name}`
  }
}

const cap = new MyCap('扣扣','青色')
console.log(cap.showColor())
console.log(cap.showName())
// 杯子的颜色:青色
// 杯子的名字: 扣扣
```



### 总结说明
* 定义的变量比接口少一些属性是不允许的，多一些属性也是不允许的。必有的一定要有，且不能少也不能多。也就是说 **变量的形状必须和接口的形状保持一致**
* 可选属性：使用 `?` 表示。可选属性表示 这个属性可有可无。
* 任意属性：可以通过 `[propName: string]: any`。定义任意属性。但是必须要注意
  * **一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它类型的子集**
  * 一个接口只能定义一个任意类型。
* 只读属性：使用 `readonly` 定义只读属性。注意：
  * **只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**



## 对象的类型
在 TS 中，使用接口 <small>(interface)</small> 来定义对象的类型。

```typescript
interface PersonA {
  readonly id: number;
  name: string;
  age: number;
  favoriteFood?: string[]; // 可选属性
  [propName: string]: string | number | string[]; // 任意属性
}

const tom: PersonA = {
  name: 'tom',
  age: 16,
}
console.log(tom)
```



## 数组的类型
使用方式一：使用 `类型[]` 这种形式来表示。
使用方式二：使用 `Array<类型>` 这种形式来表示。

```typescript
const sorce: number[] = [1, 2, 3];
const sorce: (number | string )[] = [1, '2', 3];
const sorce: Array<number | string> = [1, '2', 3];
```

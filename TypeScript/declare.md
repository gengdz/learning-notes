# declare
作用是：声明类型，使用 declare 声明的类型，不需要导入即可使用。

`.d.ts` 文件中的顶级声明必须以 "declare" 或 "export" 修饰符开头。
declare 就是告诉TS编译器你担保这些变量和模块存在，并声明了相应类型，编译的时候不需要提示错误！



## declare 用法
1. 在 `a.d.ts` 文件中使用：
```typescript
// 用来声明一个对象
declare namespace myNamespace {
  var aaa: number | string;
  function getName(id: number | string): string;
  class Person {
    static maxAge: number; //静态变量
    static getMaxAge(): number; //静态方法

    constructor(name: string, age: number); //构造函数
    getName(id: number): string; //实例方法
  }
}

// 用来声明一个 常量
declare const myConst: string;

// 用来声明一个 函数
declare function jQuery(selector: string): any;

// 用来声明一个 类
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}

```



## declare 在 npm 包中与 export 的使用说明
npm 包的声明文件与全局变量的声明文件有很大区别。
在 npm 包的声明文件中，使用 declare 不再会声明一个全局变量，而只会在当前文件中声明一个局部变量。只有在声明文件中使用 export 导出，然后在使用方 import 导入后，才会应用到这些类型声明。
export 的语法与普通的 ts 中的语法类似，区别仅在于声明文件中禁止定义具体的实现

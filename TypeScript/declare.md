# declare
作用是：声明类型，使用 declare 声明的类型，不需要导入即可使用。

`.d.ts` 文件中的顶级声明必须以 "declare" 或 "export" 修饰符开头。
declare 就是告诉TS编译器你担保这些变量和模块存在，并声明了相应类型，编译的时候不需要提示错误！



## declare 用法
在 `a.d.ts` 文件中使用：
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


`declare module` 的用法
为 npm 包完善类型，如果是需要扩展原有模块的话，需要在类型声明文件中**先引用原有模块，再使用 declare module 扩展原有模块**：
```typescript
// moment 一定要导入, 因为只有导入才是扩充, 不导入就会变成覆盖.
import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
```



## declare 中 import/export

* 如果在声明文件中使用了 import/export，那么在使用的时候，就需要手动 import 了。

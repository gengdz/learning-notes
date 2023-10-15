# declare

作用是：声明类型，使用 declare 声明的类型，不需要导入即可使用。

declare 就是告诉 TS 编译器你担保这些变量和模块存在，并声明了相应类型，编译的时候不需要提示错误！

- 在声明文件中，type | interface | let | const 等可以不用加 declare，和加了效果相同。
- declare 与 import/export 在同一个文件时。那么这里面的类型必须要使用 export 的方式才能使用。需要自己写类型了（如果不写 import 那么自动拥有类型），并且里面的其他内容不需要写 export，在别的文件也可以被 import 到。
- 如果一定要导入，那么使用 三斜线指令 `//// <reference types= 'vite/client'/>;`
- 在使用 `declare module x` 时：
  - 如果是需要扩展原有模块的话，需要在类型声明文件中**先引用原有模块，再使用 declare module 扩展原有模块**。导入是扩充，不导入就是覆盖。
  - 如果在项目 A 1.4.0 版本下的 axios 通过 declare module 的方式更改了类型，并且项目声明的类型文件(package.json -> types)包括了这个改动，在项目 B 中引入了项目 A，项目 B 中也安装了 axios， 1.4.0 版本会被影响， 1.5.0 版本的 axios 没有受到影响。
  - 如果想要保留对 x 库类型的修改，项目 A 的 types 只有在路径 声明了 `declare module x` 的文件中才有效，否则没效果。

## declare 用法

在 `xx.d.ts` 文件中使用：

```typescript
// 声明一个 interface
declare interface Window {
  appConfig: any;
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
```

`declare module` 的用法为 npm 包完善类型，如果是需要扩展原有模块的话，需要在类型声明文件中**先引用原有模块，再使用 declare module 扩展原有模块**：

```typescript
// moment 一定要导入，因为只有导入才是扩充，不导入就会变成覆盖。
import * as moment from 'moment';

declare module 'moment' {
  export function foo(): moment.CalendarKey;
}
```

## declare 中 import/export

- 如果在声明文件中使用了 import/export，那么在使用的时候，就需要手动 import 了。

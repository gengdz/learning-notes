/*
  16259 - 将类型为字面类型（标签类型）的属性，转换为基本类型。
  -------
  by 前端子鱼 (@mwc) #中等

  ### 题目

  // 将类型为字面类型（标签类型）的属性，转换为基本类型。

  type PersonInfo = {
    name: 'Tom',
    age: 30,
    married: false,
    addr: {
      home: '123456',
      phone: '13111111111'
    }
  }

  // 要求结果如下：
  type PersonInfo = {
    name: string,
    age: number,
    married: boolean,
    addr: {
      home: string,
      phone: string
    }
  }

  > 在 Github 上查看：https://tsch.js.org/16259/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ToPrimitive1<T extends object> = {
  [P in keyof T]: T[P] extends string
    ? string
    : T[P] extends number
      ? number
      : T[P] extends boolean
        ? boolean
        : T[P] extends Function
          ? Function
          : T[P] extends object
            ? ToPrimitive<T[P]>
            : any;
};

// type ToPrimitive<T> = T extends Function
//   ? Function
//   : T extends object
//     ? { [K in keyof T]: ToPrimitive<T[K]> }
//     : T extends { valueOf(): infer R }
//       ? R
//       : T;

type ToPrimitive<T> = T extends object
  ? T extends (...args: never[]) => unknown
    ? Function
    : {
        [Key in keyof T]: ToPrimitive<T[Key]>;
      }
  : T extends { valueOf: () => infer P }
    ? P
    : T;

type aa = false extends { valueOf: () => infer P } ? P : any;
type a = ToPrimitive<PersonInfo>;
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type PersonInfo = {
  name: 'Tom';
  age: 30;
  married: false;
  addr: {
    home: '123456';
    phone: '13111111111';
  };
  hobbies: ['sing', 'dance'];
  readonlyArr: readonly ['test'];
  fn: () => any;
};

type ExpectedResult = {
  name: string;
  age: number;
  married: boolean;
  addr: {
    home: string;
    phone: string;
  };
  hobbies: [string, string];
  readonlyArr: readonly [string];
  fn: Function;
};

type cases = [Expect<Equal<ToPrimitive<PersonInfo>, ExpectedResult>>];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/16259/answer/zh-CN
  > 查看解答： https://tsch.js.org/16259/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

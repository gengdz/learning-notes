/*
  5117 - 去除数组指定元素
  -------
  by Pineapple (@Pineapple0919) #中等 #联合类型 #数组

  ### 题目

  实现一个像 Lodash.without 函数一样的泛型 Without<T, U>，它接收数组类型的 T 和数字或数组类型的 U 为参数，会返回一个去除 U 中元素的数组 T。

  例如：

  ```ts
  type Res = Without<[1, 2], 1>; // expected to be [2]
  type Res1 = Without<[1, 2, 4, 1, 5], [1, 2]>; // expected to be [4, 5]
  type Res2 = Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>; // expected to be []
  ```

  > 在 Github 上查看：https://tsch.js.org/5117/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type Without<T, U, Result extends any[] = []> = U extends any[]
//   ? T extends [infer First, ...infer Rest]
//     ? First extends U[number]
//       ? Without<Rest, U, Result>
//       : Without<Rest, U, [...Result, First]>
//     : Result
//   : T extends [infer First, ...infer Rest]
//     ? First extends U
//       ? Without<Rest, U, Result>
//       : Without<Rest, U, [...Result, First]>
//     : Result;

type Unionize<T extends unknown[] | unknown> = T extends unknown[]
  ? T[number]
  : T;

type Without<T extends unknown[], U> = T extends [infer Head, ...infer Rest]
  ? Head extends Unionize<U>
    ? Without<Rest, U>
    : [Head, ...Without<Rest, U>]
  : [];

type a = Without<[1, 2], 1>;
type b = Without<[1, 2, 4, 1, 5], [1, 2]>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/5117/answer/zh-CN
  > 查看解答： https://tsch.js.org/5117/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

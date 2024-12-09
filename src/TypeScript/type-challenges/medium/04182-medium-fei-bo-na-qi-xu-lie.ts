/*
  4182 - 斐波那契序列
  -------
  by windliang (@wind-liang) #中等

  ### 题目

  Implement a generic Fibonacci\<T\> takes an number T and returns it's corresponding [Fibonacci number](https://en.wikipedia.org/wiki/Fibonacci_number).

  The sequence starts:
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

  For example
  ```js
  type Result1 = Fibonacci<3> // 2
  type Result2 = Fibonacci<8> // 21
  ```

  > 在 Github 上查看：https://tsch.js.org/4182/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type Fibonacci<T extends number, R extends any[] = [], L extends any[] = []> = R['length'] extends T
//   ? R[R['length']]
//   : T extends 1 | 2
//     ? Fibonacci<T, [...R, 1]>
//     : Fibonacci<T, [...R, 2]>;

// TODO 比较复杂，后面再理解
type Fibonacci<
  T extends number,
  CurrentIndex extends any[] = [1], // 当前的索引
  Prev extends any[] = [], // 之前的值
  Current extends any[] = [1],
> = CurrentIndex['length'] extends T
  ? Current['length']
  : Fibonacci<T, [...CurrentIndex, 1], Current, [...Prev, ...Current]>;

type b = [1, 1, 2, 3, 5, 8];
type c = b[4];
type a = Fibonacci<20>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Fibonacci<1>, 1>>,
  Expect<Equal<Fibonacci<2>, 1>>,
  Expect<Equal<Fibonacci<3>, 2>>,
  Expect<Equal<Fibonacci<8>, 21>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/4182/answer/zh-CN
  > 查看解答： https://tsch.js.org/4182/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

/*
  4484 - IsTuple
  -------
  by jiangshan (@jiangshanmeta) #中等 #tuple

  ### 题目

  Implement a type ```IsTuple```, which takes an input type ```T``` and returns whether ```T``` is tuple type.

  For example:

  ```typescript
  type case1 = IsTuple<[number]> // true
  type case2 = IsTuple<readonly [number]> // true
  type case3 = IsTuple<number[]> // false
  ```

  > 在 Github 上查看：https://tsch.js.org/4484/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type IsTuple<T extends readonly any[]> = T['length'] extends number ? true : false;

type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
    ? number extends T['length']
      ? false
      : true
    : false;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/4484/answer/zh-CN
  > 查看解答： https://tsch.js.org/4484/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

/*
  5140 - Trunc
  -------
  by jiangshan (@jiangshanmeta) #中等 #template-literal

  ### 题目

  Implement the type version of ```Math.trunc```, which takes string or number and returns the integer part of a number by removing any fractional digits.

  For example:

  ```typescript
  type A = Trunc<12.34> // 12
  ```

  > 在 Github 上查看：https://tsch.js.org/5140/zh-CN
*/

/* _____________ 你的代码 _____________ */

// space
type Trunc<T extends number | string> = `${T}` extends `${infer N}.${any}`
  ? `${N}` extends `` | '+' | '-'
    ? `${N}0`
    : N
  : `${T}`;

type a = Trunc<'-.3'>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Trunc<0.1>, '0'>>,
  Expect<Equal<Trunc<0.2>, '0'>>,
  Expect<Equal<Trunc<1.234>, '1'>>,
  Expect<Equal<Trunc<12.345>, '12'>>,
  Expect<Equal<Trunc<-5.1>, '-5'>>,
  Expect<Equal<Trunc<'.3'>, '0'>>,
  Expect<Equal<Trunc<'1.234'>, '1'>>,
  Expect<Equal<Trunc<'-.3'>, '-0'>>,
  Expect<Equal<Trunc<'-10.234'>, '-10'>>,
  Expect<Equal<Trunc<10>, '10'>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/5140/answer/zh-CN
  > 查看解答： https://tsch.js.org/5140/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

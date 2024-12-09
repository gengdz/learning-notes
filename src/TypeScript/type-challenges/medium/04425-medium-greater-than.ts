/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #中等 #array

  ### 题目

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > 在 Github 上查看：https://tsch.js.org/4425/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ArrayFrom<T extends number, R extends any[] = []> = R['length'] extends T
  ? R
  : ArrayFrom<T, [...R, 1]>;

// ✅ FIXME 这种写法，最后一个不会通过。
type GreaterThan<T extends number, U extends number> =
  ArrayFrom<U> extends [...ArrayFrom<T>, ...any] ? false : true;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/4425/answer/zh-CN
  > 查看解答： https://tsch.js.org/4425/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

/*
  5181 - Mutable Keys
  -------
  by Yugang Cao (@Talljack) #困难 #utils

  ### 题目

  Implement the advanced util type MutableKeys<T>, which picks all the mutable (not readonly) keys into a union.

  For example:

  ```ts
  type Keys = MutableKeys<{ readonly foo: string; bar: number }>;
  // expected to be “bar”
  ```

  > 在 Github 上查看：https://tsch.js.org/5181/zh-CN
*/

/* _____________ 你的代码 _____________ */

type MutableKeys<T> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MutableKeys<{ a: number, readonly b: string }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined, readonly b: undefined }>, 'a'>>,
  Expect<Equal<MutableKeys<{ a: undefined, readonly b?: undefined, c: string, d: null }>, 'a' | 'c' | 'd'>>,
  Expect<Equal<MutableKeys<{}>, never>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/5181/answer/zh-CN
  > 查看解答： https://tsch.js.org/5181/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

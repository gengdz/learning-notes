/*
  27958 - CheckRepeatedTuple
  -------
  by bowen (@jiaowoxiaobala) #中等

  ### 题目

  判断一个元组类型中是否有相同的成员

  For example:

  ```ts
  type CheckRepeatedTuple<[1, 2, 3]>   // false
  type CheckRepeatedTuple<[1, 2, 1]>   // true
  ```

  > 在 Github 上查看：https://tsch.js.org/27958/zh-CN
*/

/* _____________ 你的代码 _____________ */

type CheckRepeatedTuple<T extends unknown[]> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CheckRepeatedTuple<[number, number, string, boolean]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[number, string]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 3]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[1, 2, 1]>, true>>,
  Expect<Equal<CheckRepeatedTuple<[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<string[]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[number, 1, string, '1', boolean, true, false, unknown, any]>, false>>,
  Expect<Equal<CheckRepeatedTuple<[never, any, never]>, true>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/27958/answer/zh-CN
  > 查看解答： https://tsch.js.org/27958/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

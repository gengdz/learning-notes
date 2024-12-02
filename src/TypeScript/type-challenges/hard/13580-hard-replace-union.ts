/*
  13580 - Replace Union
  -------
  by Konstantin Barabanov (@crutch12) #困难

  ### 题目

  Given an `union of types` and `array of type pairs` to replace (`[[string, number], [Date, null]]`), return a new union replaced with the `type pairs`.

  > 在 Github 上查看：https://tsch.js.org/13580/zh-CN
*/

/* _____________ 你的代码 _____________ */

type UnionReplace<T, U extends [any, any][]> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null]]>, number | null>>,

  // string -> null
  Expect<Equal<UnionReplace<number | string, [[string, null], [Date, Function]]>, number | null>>,

  // Date -> string; Function -> undefined
  Expect<Equal<UnionReplace<Function | Date | object, [[Date, string], [Function, undefined]]>, undefined | string | object>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/13580/answer/zh-CN
  > 查看解答： https://tsch.js.org/13580/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

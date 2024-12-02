/*
  300 - String to Number
  -------
  by Pig Fang (@g-plane) #困难 #template-literal

  ### 题目

  Convert a string literal to a number, which behaves like `Number.parseInt`.

  > 在 Github 上查看：https://tsch.js.org/300/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ToNumber<S extends string> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ToNumber<'0'>, 0>>,
  Expect<Equal<ToNumber<'5'>, 5>>,
  Expect<Equal<ToNumber<'12'>, 12>>,
  Expect<Equal<ToNumber<'27'>, 27>>,
  Expect<Equal<ToNumber<'18@7_$%'>, never>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/300/answer/zh-CN
  > 查看解答： https://tsch.js.org/300/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

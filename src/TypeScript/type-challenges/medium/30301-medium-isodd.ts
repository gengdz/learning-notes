/*
  30301 - IsOdd
  -------
  by jiangshan (@jiangshanmeta) #中等 #string

  ### 题目

  return true is a number is odd

  > 在 Github 上查看：https://tsch.js.org/30301/zh-CN
*/

/* _____________ 你的代码 _____________ */

type IsOdd<T extends number> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsOdd<5>, true>>,
  Expect<Equal<IsOdd<2023>, true>>,
  Expect<Equal<IsOdd<1453>, true>>,
  Expect<Equal<IsOdd<1926>, false>>,
  Expect<Equal<IsOdd<2.3>, false>>,
  Expect<Equal<IsOdd<3e23>, false>>,
  Expect<Equal<IsOdd<number>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/30301/answer/zh-CN
  > 查看解答： https://tsch.js.org/30301/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

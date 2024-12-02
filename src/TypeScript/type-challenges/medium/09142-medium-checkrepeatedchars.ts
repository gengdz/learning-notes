/*
  9142 - CheckRepeatedChars
  -------
  by Hong (@RThong) #中等 #union #string

  ### 题目

  判断一个string类型中是否有相同的字符
  ```ts
  type CheckRepeatedChars<'abc'>   // false
  type CheckRepeatedChars<'aba'>   // true
  ```

  > 在 Github 上查看：https://tsch.js.org/9142/zh-CN
*/

/* _____________ 你的代码 _____________ */

type CheckRepeatedChars<T extends string> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/9142/answer/zh-CN
  > 查看解答： https://tsch.js.org/9142/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

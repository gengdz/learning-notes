/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #中等 #template-literal

  ### 题目

  计算字符串的长度，类似于 `String#length` 。

  > 在 Github 上查看：https://tsch.js.org/298/zh-CN
*/

/* _____________ 你的代码 _____________ */

type LengthOfString<
  S extends string,
  T extends string[] = [],
> = S extends `${infer F}${infer R}`
  ? LengthOfString<R, [...T, F]>
  : T['length']

// 说明 LengthOfString 中的 T 变成 ['h','e','l','l','o']，然后就可以计算长度了。

type a = LengthOfString<'kumiko'>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/298/answer/zh-CN
  > 查看解答： https://tsch.js.org/298/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

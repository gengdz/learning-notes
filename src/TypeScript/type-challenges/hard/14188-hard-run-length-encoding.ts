/*
  14188 - Run-length encoding
  -------
  by Hen Hedymdeith (@alfaproxima) #困难

  ### 题目

  Given a `string` sequence of a letters f.e. `AAABCCXXXXXXY`. Return run-length encoded string `3AB2C6XY`.
  Also make a decoder for that string.

  > 在 Github 上查看：https://tsch.js.org/14188/zh-CN
*/

/* _____________ 你的代码 _____________ */

namespace RLE {
  export type Encode<S extends string> = any
  export type Decode<S extends string> = any
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  // Raw string -> encoded string
  Expect<Equal<RLE.Encode<'AAABCCXXXXXXY'>, '3AB2C6XY'>>,

  // Encoded string -> decoded string
  Expect<Equal<RLE.Decode<'3AB2C6XY'>, 'AAABCCXXXXXXY'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/14188/answer/zh-CN
  > 查看解答： https://tsch.js.org/14188/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

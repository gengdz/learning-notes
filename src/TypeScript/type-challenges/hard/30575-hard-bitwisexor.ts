/*
  30575 - BitwiseXOR
  -------
  by jiangshan (@jiangshanmeta) #困难

  ### 题目

  Implement ```BitwiseXOR<S1,S2>``` which takes two binary string literal type and returns a binary string that reprents the bitwise XOR of S1 and S2

  For example:

  ```typescript
  BitwiseXOR<'0','1'> // expect '1'
  BitwiseXOR<'1','1'> // expect '0'
  BitwiseXOR<'10','1'>  // expect '11'
  ```

  > 在 Github 上查看：https://tsch.js.org/30575/zh-CN
*/

/* _____________ 你的代码 _____________ */

type BitwiseXOR<S1 extends string, S2 extends string> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<BitwiseXOR<'0', '1'>, '1'>>,
  Expect<Equal<BitwiseXOR<'1', '1'>, '0'>>,
  Expect<Equal<BitwiseXOR<'10', '1'>, '11'>>,
  Expect<Equal<BitwiseXOR<'110', '1'>, '111'>>,
  Expect<Equal<BitwiseXOR<'101', '11'>, '110'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/30575/answer/zh-CN
  > 查看解答： https://tsch.js.org/30575/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

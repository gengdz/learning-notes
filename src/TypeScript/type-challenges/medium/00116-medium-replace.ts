/*
  116 - Replace
  -------
  by Anthony Fu (@antfu) #中等 #template-literal

  ### 题目

  实现 `Replace<S, From, To>` 将字符串 `S` 中的第一个子字符串 `From` 替换为 `To` 。

  例如

  ```ts
  type replaced = Replace<'types are fun!', 'fun', 'awesome'> // 期望是 'types are awesome!'
  ```

  > 在 Github 上查看：https://tsch.js.org/116/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type Replace<S extends string, From extends string, To extends string> = S extends `${infer Start}${From}${infer Rest}`
//   ? From extends '' ? S : `${Start}${To}${Rest}`
//   : S

type Replace<S extends string, From extends string, To extends string> = From extends ''
  ? S
  : S extends `${infer Start}${From}${infer Rest}`
    ? `${Start}${To}${Rest}`
    : S
type a = Replace<'foobarbar', '', 'foo'>
/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/116/answer/zh-CN
  > 查看解答： https://tsch.js.org/116/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

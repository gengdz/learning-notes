/*
  108 - 去除两端空白字符
  -------
  by Anthony Fu (@antfu) #中等 #template-literal

  ### 题目

  实现`Trim<T>`，它接受一个明确的字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

  例如

  ```ts
  type trimed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```

  > 在 Github 上查看：https://tsch.js.org/108/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Space = ' ' | '\n' | '\t'
// type Trim<S extends string> = S extends `${Space}${infer R}` ? Trim<R> : S extends `${infer L}${Space}` ? Trim<L> : S

type Trim<S extends string> = S extends `${Space}${infer T}` | `${infer T}${Space}` ? Trim<T> : S

type a = Trim<' str'>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/108/answer/zh-CN
  > 查看解答： https://tsch.js.org/108/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

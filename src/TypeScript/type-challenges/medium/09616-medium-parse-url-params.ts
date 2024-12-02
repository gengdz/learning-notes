/*
  9616 - Parse URL Params
  -------
  by Anderson. J (@andersonjoseph) #中等 #infer #string #template-literal

  ### 题目

  You're required to implement a type-level parser to parse URL params string into an Union.

  ```ts
  ParseUrlParams<':id'> // id
  ParseUrlParams<'posts/:id'> // id
  ParseUrlParams<'posts/:id/:user'> // id | user
  ```

  > 在 Github 上查看：https://tsch.js.org/9616/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ParseUrlParams<T> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<ParseUrlParams<''>, never>>,
  Expect<Equal<ParseUrlParams<':id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/'>, 'id'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user'>, 'id' | 'user'>>,
  Expect<Equal<ParseUrlParams<'posts/:id/:user/like'>, 'id' | 'user'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/9616/answer/zh-CN
  > 查看解答： https://tsch.js.org/9616/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

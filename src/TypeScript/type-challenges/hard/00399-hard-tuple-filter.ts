/*
  399 - Tuple Filter
  -------
  by Ryo Hanafusa (@softoika) #困难 #tuple #infer

  ### 题目

  Implement a type `FilterOut<T, F>` that filters out items of the given type `F` from the tuple `T`.

  For example,
  ```ts
  type Filtered = FilterOut<[1, 2, null, 3], null> // [1, 2, 3]
  ```

  > 在 Github 上查看：https://tsch.js.org/399/zh-CN
*/

/* _____________ 你的代码 _____________ */

type FilterOut<T extends any[], F> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<FilterOut<[], never>, []>>,
  Expect<Equal<FilterOut<[never], never>, []>>,
  Expect<Equal<FilterOut<['a', never], never>, ['a']>>,
  Expect<Equal<FilterOut<[1, never, 'a'], never>, [1, 'a']>>,
  Expect<Equal<FilterOut<[never, 1, 'a', undefined, false, null], never | null | undefined>, [1, 'a', false]>>,
  Expect<Equal<FilterOut<[number | null | undefined, never], never | null | undefined>, [number | null | undefined]>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/399/answer/zh-CN
  > 查看解答： https://tsch.js.org/399/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

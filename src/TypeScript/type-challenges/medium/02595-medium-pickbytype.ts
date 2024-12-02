/*
  2595 - PickByType
  -------
  by jiangshan (@jiangshanmeta) #中等 #object

  ### 题目

  From `T`, pick a set of properties whose type are assignable to `U`.

  For Example

  ```typescript
  type OnlyBoolean = PickByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { isReadonly: boolean; isEnable: boolean; }
  ```

  > 在 Github 上查看：https://tsch.js.org/2595/zh-CN
*/

/* _____________ 你的代码 _____________ */

type PickByType<T, U> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<PickByType<Model, boolean>, { isReadonly: boolean, isEnable: boolean }>>,
  Expect<Equal<PickByType<Model, string>, { name: string }>>,
  Expect<Equal<PickByType<Model, number>, { count: number }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/2595/answer/zh-CN
  > 查看解答： https://tsch.js.org/2595/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

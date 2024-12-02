/*
  2852 - OmitByType
  -------
  by jiangshan (@jiangshanmeta) #中等 #object

  ### 题目

  From ```T```, pick a set of properties whose type are not assignable to ```U```.

  For Example

  ```typescript
  type OmitBoolean = OmitByType<{
    name: string
    count: number
    isReadonly: boolean
    isEnable: boolean
  }, boolean> // { name: string; count: number }
  ```

  > 在 Github 上查看：https://tsch.js.org/2852/zh-CN
*/

/* _____________ 你的代码 _____________ */

type OmitByType<T, U> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  count: number
  isReadonly: boolean
  isEnable: boolean
}

type cases = [
  Expect<Equal<OmitByType<Model, boolean>, { name: string, count: number }>>,
  Expect<Equal<OmitByType<Model, string>, { count: number, isReadonly: boolean, isEnable: boolean }>>,
  Expect<Equal<OmitByType<Model, number>, { name: string, isReadonly: boolean, isEnable: boolean }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/2852/answer/zh-CN
  > 查看解答： https://tsch.js.org/2852/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

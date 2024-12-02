/*
  2949 - ObjectFromEntries
  -------
  by jiangshan (@jiangshanmeta) #困难 #object

  ### 题目

  Implement the type version of ```Object.fromEntries```

  For example:

  ```typescript
  interface Model {
    name: string;
    age: number;
    locations: string[] | null;
  }

  type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null];

  type result = ObjectFromEntries<ModelEntries> // expected to be Model
  ```

  > 在 Github 上查看：https://tsch.js.org/2949/zh-CN
*/

/* _____________ 你的代码 _____________ */

type ObjectFromEntries<T> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Model {
  name: string
  age: number
  locations: string[] | null
}

type ModelEntries = ['name', string] | ['age', number] | ['locations', string[] | null]

type cases = [
  Expect<Equal<ObjectFromEntries<ModelEntries>, Model>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/2949/answer/zh-CN
  > 查看解答： https://tsch.js.org/2949/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

/*
  5 - 获取只读属性
  -------
  by Anthony Fu (@antfu) #地狱 #utils #object-keys

  ### 题目

  实现泛型`GetReadonlyKeys<T>`，`GetReadonlyKeys<T>`返回由对象 T 所有只读属性的键组成的联合类型。

  例如

  ```ts
  interface Todo {
    readonly title: string
    readonly description: string
    completed: boolean
  }

  type Keys = GetReadonlyKeys<Todo> // expected to be "title" | "description"
  ```

  > 在 Github 上查看：https://tsch.js.org/5/zh-CN
*/

/* _____________ 你的代码 _____________ */

type GetReadonlyKeys<T> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<'title', GetReadonlyKeys<Todo1>>>,
  Expect<Equal<'title' | 'description', GetReadonlyKeys<Todo2>>>,
]

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Todo2 {
  readonly title: string
  readonly description: string
  completed?: boolean
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/5/answer/zh-CN
  > 查看解答： https://tsch.js.org/5/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

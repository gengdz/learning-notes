/*
  4 - 实现 Pick
  -------
  by Anthony Fu (@antfu) #简单 #union #built-in

  ### 题目

  不使用 `Pick<T, K>` ，实现 TS 内置的 `Pick<T, K>` 的功能。

  **从类型 `T` 中选出符合 `K` 的属性，构造一个新的类型**。

  例如：

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
      title: 'Clean room',
      completed: false,
  }
  ```

  > 在 Github 上查看：https://tsch.js.org/4/zh-CN
*/

/* _____________ 你的代码 _____________ */

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>,
]

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
}

interface Expected2 {
  title: string
  completed: boolean
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/4/answer/zh-CN
  > 查看解答： https://tsch.js.org/4/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

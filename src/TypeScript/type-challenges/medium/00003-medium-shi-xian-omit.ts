/*
  3 - 实现 Omit
  -------
  by Anthony Fu (@antfu) #中等 #union #built-in

  ### 题目

  不使用 `Omit` 实现 TypeScript 的 `Omit<T, K>` 泛型。

  `Omit` 会创建一个省略 `K` 中字段的 `T` 对象。

  例如：

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > 在 Github 上查看：https://tsch.js.org/3/zh-CN
*/

/* _____________ 你的代码 _____________ */

// 这种写法通不过 第 3 个用例，原因在于 现在直接创建了一个新的类型，其中的属性被重新定义。
// type MyOmit<T, K extends keyof T> = {
//   [P in Exclude<keyof T, K>]: T[P]
// }

// type MyPick<T, K extends keyof T> = {
//   [P in K]: T[P];
// }
// 这种可以的原因在于 MyPick 只是直接映射 K 中的属性，所以它保留了 readonly 修饰符
// type MyOmit<T, K extends keyof T> = MyPick<T, Exclude<keyof T, K>>

type MyOmit<T, K extends keyof T> = { [P in keyof T as P extends K ? never : P]: T[P] }
//
// type a = Exclude<keyof Todo, 'description' | 'invalid'>

// type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/3/answer/zh-CN
  > 查看解答： https://tsch.js.org/3/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

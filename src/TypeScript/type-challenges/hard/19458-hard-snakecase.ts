/*
  19458 - SnakeCase
  -------
  by Gabriel Vergnaud (@gvergnaud) #困难 #template-literal #string

  ### 题目

  Create a `SnakeCase<T>` generic that turns a string formatted in **camelCase** into a string formatted in **snake_case**.

  A few examples:

  ```ts
  type res1 = SnakeCase<"hello">; // => "hello"
  type res2 = SnakeCase<"userName">; // => "user_name"
  type res3 = SnakeCase<"getElementById">; // => "get_element_by_id"
  ```

  > 在 Github 上查看：https://tsch.js.org/19458/zh-CN
*/

/* _____________ 你的代码 _____________ */

type SnakeCase<T> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<SnakeCase<'hello'>, 'hello'>>,
  Expect<Equal<SnakeCase<'userName'>, 'user_name'>>,
  Expect<Equal<SnakeCase<'getElementById'>, 'get_element_by_id'>>,
  Expect<Equal<SnakeCase<'getElementById' | 'getElementByClassNames'>, 'get_element_by_id' | 'get_element_by_class_names'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/19458/answer/zh-CN
  > 查看解答： https://tsch.js.org/19458/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

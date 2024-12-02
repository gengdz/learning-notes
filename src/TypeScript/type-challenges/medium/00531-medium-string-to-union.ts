/*
  531 - String to Union
  -------
  by Andrey Krasovsky (@bre30kra69cs) #中等 #union #string

  ### 题目

  实现一个将接收到的String参数转换为一个字母Union的类型。

  例如

  ```ts
  type Test = '123';
  type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
  ```

  > 在 Github 上查看：https://tsch.js.org/531/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type StringToUnion<T extends string, R extends any[] = []> = T extends `${infer First}${infer Rest}` ? StringToUnion<Rest, [...R, First]> : R[number]

type StringToUnion<T extends string> = T extends `${infer Letter}${infer Rest}`
  ? Letter | StringToUnion<Rest>
  : never

type a = ['h', 'e', 'l']
type b = a[number]

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<StringToUnion<''>, never>>,
  Expect<Equal<StringToUnion<'t'>, 't'>>,
  Expect<Equal<StringToUnion<'hello'>, 'h' | 'e' | 'l' | 'l' | 'o'>>,
  Expect<Equal<StringToUnion<'coronavirus'>, 'c' | 'o' | 'r' | 'o' | 'n' | 'a' | 'v' | 'i' | 'r' | 'u' | 's'>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/531/answer/zh-CN
  > 查看解答： https://tsch.js.org/531/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

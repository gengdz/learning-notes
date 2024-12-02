/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #中等 #object

  ### 题目

  获取两个接口类型中的差值属性。

  ```ts
  type Foo = {
    a: string;
    b: number;
  }
  type Bar = {
    a: string;
    c: boolean
  }

  type Result1 = Diff<Foo,Bar> // { b: number, c: boolean }
  type Result2 = Diff<Bar,Foo> // { b: number, c: boolean }

  ```

  > 在 Github 上查看：https://tsch.js.org/645/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type Diff<O, O1> = {
//   [P in Exclude<keyof O, keyof O1> | Exclude<keyof O1, keyof O>]: P extends keyof O ? O[P] : P extends keyof O1 ? O1[P] : never
// }

type Diff<O, O1> = Omit<O & O1, keyof (O | O1)>

type result = keyof (Foo | Bar)

type UnionType = Foo | Bar

const a: UnionType = {
  gender: 1,
  age: '12',
  name: '10',
}
type bb = keyof UnionType

type result1 = UnionType | bb

type aa = Exclude<keyof Bar, keyof Foo> | Exclude<keyof Foo, keyof Bar>
type b = Diff<Foo, Bar>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string, gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string, gender: number }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/645/answer/zh-CN
  > 查看解答： https://tsch.js.org/645/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

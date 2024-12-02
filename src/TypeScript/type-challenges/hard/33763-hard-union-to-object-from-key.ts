/*
  33763 - Union to Object from key
  -------
  by clen cat (@a145789) #困难

  ### 题目

  Find the object containing the key in the union type by the key. It  takes two parameters: a union of object types and a key name.

  > 在 Github 上查看：https://tsch.js.org/33763/zh-CN
*/

/* _____________ 你的代码 _____________ */

type UnionToObjectFromKey<Union, Key> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  foo: string
  common: boolean
}

type Bar = {
  bar: number
  common: boolean
}

type Other = {
  other: string
}

type cases = [
  Expect<Equal<UnionToObjectFromKey<Foo | Bar, 'foo'>, Foo>>,
  Expect<Equal<UnionToObjectFromKey<Foo | Bar, 'common'>, {
    foo: string
    common: boolean
  } | {
    bar: number
    common: boolean
  }>>,
  Expect<Equal<UnionToObjectFromKey<Foo | Bar | Other, 'common'>, {
    foo: string
    common: boolean
  } | {
    bar: number
    common: boolean
  }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/33763/answer/zh-CN
  > 查看解答： https://tsch.js.org/33763/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

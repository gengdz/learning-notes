/*
  2757 - PartialByKeys
  -------
  by jiangshan (@jiangshanmeta) #中等 #object

  ### 题目

  实现一个通用的`PartialByKeys<T, K>`，它接收两个类型参数`T`和`K`。

  `K`指定应设置为可选的`T`的属性集。当没有提供`K`时，它就和普通的`Partial<T>`一样使所有属性都是可选的。

  例如:

  ```ts
  interface User {
    name: string
    age: number
    address: string
  }

  type UserPartialName = PartialByKeys<User, 'name'> // { name?:string; age:number; address:string }
  ```

  > 在 Github 上查看：https://tsch.js.org/2757/zh-CN
*/

/* _____________ 你的代码 _____________ */

type PartialByKeys<T, K> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface User {
  name: string
  age: number
  address: string
}

interface UserPartialName {
  name?: string
  age: number
  address: string
}

interface UserPartialNameAndAge {
  name?: string
  age?: number
  address: string
}

type cases = [
  Expect<Equal<PartialByKeys<User, 'name'>, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, 'name' | 'age'>, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>,
  // @ts-expect-error
  Expect<Equal<PartialByKeys<User, 'name' | 'unknown'>, UserPartialName>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/2757/answer/zh-CN
  > 查看解答： https://tsch.js.org/2757/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

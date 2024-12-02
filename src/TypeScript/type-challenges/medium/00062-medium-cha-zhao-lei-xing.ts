/*
  62 - 查找类型
  -------
  by Anthony Fu (@antfu) #中等 #union #map

  ### 题目

  有时，您可能希望根据某个属性在联合类型中查找类型。

  在此挑战中，我们想通过在联合类型`Cat | Dog`中通过指定公共属性`type`的值来获取相应的类型。换句话说，在以下示例中，`LookUp<Dog | Cat, 'dog'>`的结果应该是`Dog`，`LookUp<Dog | Cat, 'cat'>`的结果应该是`Cat`。

  ```ts
  interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
  }

  interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
  }

  type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
  ```

  > 在 Github 上查看：https://tsch.js.org/62/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type LookUp<U, T> = U extends (infer A | infer B)
//   ? A extends { type: string } ? A['type'] extends T ? A : B : never
//   : never

type LookUp<U, T> = U extends { type: T } ? U : never
type a = LookUp<Animal, 'dog'>

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog

type cases = [
  Expect<Equal<LookUp<Animal, 'dog'>, Dog>>,
  Expect<Equal<LookUp<Animal, 'cat'>, Cat>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/62/answer/zh-CN
  > 查看解答： https://tsch.js.org/62/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

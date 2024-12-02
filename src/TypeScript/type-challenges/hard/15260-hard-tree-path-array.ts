/*
  15260 - Tree path array
  -------
  by Neil Richter (@noook) #困难

  ### 题目

  Create a type `Path` that represents validates a possible path of a tree under the form of an array.

  Related challenges:
  - [Object key path](https://github.com/type-challenges/type-challenges/blob/main/questions/07258-hard-object-key-paths/README.md)

  ```ts
  declare const example: {
      foo: {
          bar: {
              a: string;
          };
          baz: {
              b: number
              c: number
          }
      };
  }

  // Possible solutions:
  // []
  // ['foo']
  // ['foo', 'bar']
  // ['foo', 'bar', 'a']
  // ['foo', 'baz']
  // ['foo', 'baz', 'b']
  // ['foo', 'baz', 'c']
  ```

  > 在 Github 上查看：https://tsch.js.org/15260/zh-CN
*/

/* _____________ 你的代码 _____________ */

type Path<T> = any

/* _____________ 测试用例 _____________ */
import type { ExpectExtends, ExpectFalse, ExpectTrue } from '@type-challenges/utils'

declare const example: {
  foo: {
    bar: {
      a: string
    }
    baz: {
      b: number
      c: number
    }
  }
}

type cases = [
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['bar']>, ['a']>>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']['baz']>, ['b'] | ['c'] >>,
  ExpectTrue<ExpectExtends<Path<typeof example['foo']>, ['bar'] | ['baz'] | ['bar', 'a'] | ['baz', 'b'] | ['baz', 'c']>>,
  ExpectFalse<ExpectExtends<Path<typeof example['foo']['bar']>, ['z']>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/15260/answer/zh-CN
  > 查看解答： https://tsch.js.org/15260/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

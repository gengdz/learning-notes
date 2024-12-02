/*
  9989 - 统计数组中的元素个数
  -------
  by 凤之兮原 (@kongmingLatern) #中等

  ### 题目

  通过实现一个``CountElementNumberToObject``方法，统计数组中相同元素的个数
  ~~~ts
  type Simple1 = CountElementNumberToObject<[]> // return {}
  type Simple2 = CountElementNumberToObject<[1,2,3,4,5]>
  /*
   return {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1
  }
  */
  type Simple3 = CountElementNumberToObject<[1,2,3,4,5,[1,2,3]]>
  /*
   return {
    1: 2,
    2: 2,
    3: 2,
    4: 1,
    5: 1
  }
  */
  ~~~

  > 在 Github 上查看：https://tsch.js.org/9989/zh-CN
*/

/* _____________ 你的代码 _____________ */

type CountElementNumberToObject<T> = any

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5]>, {
    1: 1
    2: 1
    3: 1
    4: 1
    5: 1
  } >>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3]]>, {
    1: 2
    2: 2
    3: 2
    4: 1
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[1, 2, 3, 4, 5, [1, 2, 3, [4, 4, 1, 2]]]>, {
    1: 3
    2: 3
    3: 2
    4: 3
    5: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<[never]>, {}>>,
  Expect<Equal<CountElementNumberToObject<['1', '2', '0']>, {
    0: 1
    1: 1
    2: 1
  }>>,
  Expect<Equal<CountElementNumberToObject<['a', 'b', ['c', ['d']]]>, {
    'a': 1
    'b': 1
    'c': 1
    'd': 1
  }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/9989/answer/zh-CN
  > 查看解答： https://tsch.js.org/9989/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

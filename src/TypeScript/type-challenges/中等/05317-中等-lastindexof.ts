/*
  5317 - LastIndexOf
  -------
  by jiangshan (@jiangshanmeta) #中等 #array

  ### 题目

  实现类型版本的 ```Array.lastIndexOf```, ```LastIndexOf<T, U>```  接受数组 ```T```, any 类型 ```U```, 如果 ```U``` 存在于 ```T``` 中, 返回 ```U``` 在数组 ```T``` 中最后一个位置的索引, 不存在则返回 ```-1```

  For example:

  ```typescript
  type Res1 = LastIndexOf<[1, 2, 3, 2, 1], 2> // 3
  type Res2 = LastIndexOf<[0, 0, 0], 2> // -1
  ```

  > 在 Github 上查看：https://tsch.js.org/5317/zh-CN
*/

/* _____________ 你的代码 _____________ */

type IsEqual<T, U> = U extends T ? (T extends U ? true : false) : false;

type LastIndexOf<T, U> = T extends [...infer Rest, infer Tail]
  ? IsEqual<Tail, U> extends true
    ? Rest['length']
    : LastIndexOf<Rest, U>
  : -1;

type a = LastIndexOf<[string, 2, number, 'a', number, 1], number>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, 'a', number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, 'a', any, 1], any>, 5>>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/5317/answer/zh-CN
  > 查看解答： https://tsch.js.org/5317/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

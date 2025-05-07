/*
  17973 - DeepMutable
  -------
  by cutefcc (@cutefcc) #中等 #readonly #deep

  ### 题目

  实现一个通用的 DeepMutable<T> ，它使对象的每个属性，及其递归的子属性 - 可变。

  例如：

  ```ts
  type X = {
    readonly a: () => 1
    readonly b: string
    readonly c: {
      readonly d: boolean
      readonly e: {
        readonly g: {
          readonly h: {
            readonly i: true
            readonly j: "s"
          }
          readonly k: "hello"
        }
      }
    }
  }

  type Expected = {
    a: () => 1
    b: string
    c: {
      d: boolean
      e: {
        g: {
          h: {
            i: true
            j: "s"
          }
          k: "hello"
        }
      }
    }
  }

  type Todo = DeepMutable<X> // should be same as `Expected`
  ```

  你可以假设我们在这个挑战中只处理对象。 数组、函数、类等不需要考虑。 但是，您仍然可以通过涵盖尽可能多的不同案例来挑战自己。

  > 在 Github 上查看：https://tsch.js.org/17973/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type DeepMutable<T extends object> = {
//   -readonly [P in keyof T]: T[P] extends (...parms) => unknown
//     ? T[P]
//     : T[P] extends object
//       ? DeepMutable<T[P]>
//       : T[P];
// };
//

type DeepMutable<T extends Record<keyof any, any>> = T extends (
  ...args: any[]
) => any
  ? T
  : {
      -readonly [K in keyof T]: DeepMutable<T[K]>;
    };

type a = DeepMutable<Test2>;

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

interface Test1 {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
  readonly meta: {
    readonly author: string;
  };
}
type Test2 = {
  readonly a: () => 1;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: 's';
        };
        readonly k: 'hello';
      };
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey'];
        },
      ];
    };
  };
};
interface DeepMutableTest1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}

type DeepMutableTest2 = {
  a: () => 1;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: 's';
        };
        k: 'hello';
      };
      l: [
        'hi',
        {
          m: ['hey'];
        },
      ];
    };
  };
};

type cases = [
  Expect<Equal<DeepMutable<Test1>, DeepMutableTest1>>,
  Expect<Equal<DeepMutable<Test2>, DeepMutableTest2>>,
];

type errors = [
  // @ts-expect-error
  DeepMutable<'string'>,
  // @ts-expect-error
  DeepMutable<0>,
];

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答： https://tsch.js.org/17973/answer/zh-CN
  > 查看解答： https://tsch.js.org/17973/solutions
  > 更多题目： https://tsch.js.org/zh-CN
*/

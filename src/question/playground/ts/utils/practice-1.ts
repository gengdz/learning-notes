export {};

type MyExclude<T, K> = T extends K ? never : T;

type MyOmit<T, K> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface Person {
  name: string;
  age: number;
  k1: string;
  k2: string;
}

type AA = Omit<Person, 'k1' | 'k2'>;

type A = MyOmit<Person, 'k1' | 'k2'>;

type B = MyPick<Person, 'name' | 'k2'>;

type MyUnion = 'a' | 'b' | 'c' | 'd';

type ExcludeAB = MyExclude<MyUnion, 'a' | 'b'>;

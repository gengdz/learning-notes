export {};

const myGet = (
  obj: Record<string, unknown>,
  k: string,
  defalut: unknown = '',
) => {
  return;
};

const obj = { a: [{ b: { c: 3 } }] };
console.log(myGet(obj, 'a[0].b.c')); // => 3
console.log(myGet(obj, 'a.0.b.c')); // => 3
console.log(myGet(obj, 'a.b.c', 'default')); // => defalut

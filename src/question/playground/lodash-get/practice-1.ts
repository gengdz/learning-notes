export {};

const myGet = (
  obj: Record<string, unknown>,
  k: string,
  defalut: unknown = '',
) => {
  const transformedK = k.replace(/\[(\d*)\]/g, '.$1');
  const parts = transformedK.split('.');

  let value: unknown = obj;
  for (let i = 0; i < parts.length; i++) {
    value = value?.[parts?.[i]];
  }

  return value || defalut;
};

const obj = { a: [{ b: { c: 3 } }] };
console.log('a[0].b.c', myGet(obj, 'a[0].b.c')); // => 3
console.log('a.0.b.c', myGet(obj, 'a.0.b.c')); // => 3
console.log('a.b.c', myGet(obj, 'a.b.c', 'default')); // => defalut

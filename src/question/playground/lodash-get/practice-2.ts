export {};

const myGet = (
  obj: Record<string, unknown>,
  k: string,
  defalut: unknown = '',
) => {
  const transformedK = k.replace(
    /(\[(\d?)\])/g,
    (match, p1, p2, p3) => `.${p2}`,
  );
  const splitedK = transformedK.split('.');
  let value = obj;
  for (let i = 0; i < splitedK.length; i++) {
    value = value?.[splitedK[i]];
  }
  return value ?? defalut;
};

const obj = { a: [{ b: { c: 3 } }] };
console.log(myGet(obj, 'a[0].b.c')); // => 3
console.log(myGet(obj, 'a.0.b.c')); // => 3
console.log(myGet(obj, 'a.b.c', 'default')); // => defalut

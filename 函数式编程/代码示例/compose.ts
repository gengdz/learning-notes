const compose = (...fns) => (...params) =>
  fns.reduceRight((args, fn) => fn(...[].concat(args)), params)


const add = (x: number) => (y: number) => x + y;
const multiply2 = (x: number) => x * 2;
const add10 = add(10);

const getData = compose(multiply2, add10)
console.log('data', getData(2))
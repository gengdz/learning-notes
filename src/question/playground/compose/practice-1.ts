export {};

const compose =
  (...fns) =>
  (...params) =>
    fns.reduceRight((args, fn) => fn(...[].concat(args)), params);

const add = (x, y) => x + y;
const add1 = (x) => x + 100;
const add2 = (x) => x + 200;
const add3 = (x) => x + 300;

const add1Plus2Plus3 = compose(add3, add2, add1, add);

console.log('add1Plus2Plus3', add1Plus2Plus3(50, 50));

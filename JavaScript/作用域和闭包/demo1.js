// 这里里面的函数被 return 了，所以不会被回收
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add1 = makeAdder(1);

console.log(add1(3), add1(4));

function f1() {
  const n = 999;
  function f2() {
    console.log(n);
  }
  f2();
}

f1();
f1();

function sum() {
  let i = 1;
  return function f() {
    console.log(++i)
  }
}

const a = sum();
a(); // 2
a(); // 3
a(); // 4


// 每次调用都会开辟一块新的内存空间
const b = sum();
b(); // 2
b(); // 3


// 对象的赋值是 址传递 所以还是那块作用域
const c = b;

c(); // 4


function fn() {
  let n = 1;
  return function () {
    let m = 1;
    function show() {
      console.log(++m)
    }
    show();

    return function show1() {
      console.log(++m)
    }
  }
}

const a1 = fn();
a1(); // 2
a1(); // 2

const a11 = a1(); // 2
a11(); // 3
a11(); // 4



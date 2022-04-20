function A() { }
function B() { }
function C() { }

const a = new A();
console.log(a instanceof A);

const b = new B();
A.prototype = b;
const a1 = new A();
console.log(a1 instanceof B)

A.prototype = b.__proto__;
const a2 = new A()
console.log(a2 instanceof B);

console.log(b.isPrototypeOf(a));
Object.setPrototypeOf(a, b);
console.log(b.isPrototypeOf(a));

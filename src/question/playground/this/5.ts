const length = 10;
function fn() {
  return this.length + 1;
}
const obj = {
  length: 5,
  test1: function () {
    return fn();
  },
};
obj.test2 = fn;
console.log(obj.test1());
console.log(fn() === obj.test2());

// 11
// 11 === 6 false

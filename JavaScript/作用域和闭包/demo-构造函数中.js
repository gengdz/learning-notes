function Person() {
  let n = 1;
  this.sum = function () {
    console.log(++n)
  }
};

const p = new Person();
p.sum();
p.sum();
p.sum();


function Person1() {
  let n = 1;
  function sum() {
    console.log(++n)
  }
  return { sum, }
};


const p1 = Person1();
p1.sum();
p1.sum();
p1.sum();
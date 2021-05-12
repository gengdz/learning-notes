function User(name) {
  this.name = name;
  this.show = function () {
    console.log(`原始方案 --> ${this.name}`)
  }
};

const u1 = new User('gdz');
const u2 = new User('lisi')
console.log(u1, u2);


// 上面的版本，会产生函数复制造成内存占用。我们把共用的方法放在 prototype 上，就不会有这个问题
function Person(name) {
  this.name = name;
};
Person.prototype.show = function () {
  console.log(`原型方式共享 --> ${this.name}`)
}

const p1 = new Person('gdz');
const p2 = new Person('lisi')
console.log(p1, p2)
p1.show();


// 如果需要共享多个方法，可以用下面的方式
function Men(name) {
  this.name = name;
};
Men.prototype = {
  // 多个方法的时候，一定要有这个 constructor
  constructor: Men,
  show() {
    console.log(`共享多个方法 --> ${this.name}`)
  },
  f1() {
    console.log('共享多个方法 --> f1')
  },
  f2() {
    console.log('共享多个方法 --> f2')
  }
}

const m1 = new Men('gdz');
const m2 = new Men('lisi')
console.log(m1, m2)
m1.show();




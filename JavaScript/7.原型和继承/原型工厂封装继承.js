function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.show = function () {
  console.log(this.name, this.age)
}

function Admin() { }
Admin.prototype = Object.create(User.prototype);

Object.defineProperty(Admin.prototype, 'contructor', {
  value: Admin,
  enumerable: false,
});

// 封装原型工厂
function extend(sub, sup) {
  sub.prototype = Object.create(sup.prototype);

  Object.defineProperty(sub.prototype, 'contructor', {
    value: sub,
    enumerable: false,
  });
}
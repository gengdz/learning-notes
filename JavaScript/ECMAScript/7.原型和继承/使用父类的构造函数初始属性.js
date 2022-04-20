function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.show = function () {
  console.log(this.name, this.age)
}

function Admin(...args) {
  User.apply(this, args);
}

Admin.prototype = Object.create(User.prototype);
Admin.constructor = Admin
const a = new Admin('耿德洲', 18)
a.show(); // 耿德洲 18

function Member(...args) {
  User.apply(this, args);
}

Member.prototype = Object.create(User.prototype);
const lisi = new Member('李四', 19);
lisi.show(); // 李四 19
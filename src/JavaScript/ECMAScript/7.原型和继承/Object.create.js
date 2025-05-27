function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.show = function () {
  console.log(this.name, this.age);
};

function Admin() {}
Admin.prototype = Object.create(User.prototype);
// 上面的方式会导致 Admin 的 constrcutor 丢失
Admin.prototype.contructor = Admin;

console.dir(Admin);

Object.defineProperty(Admin.prototype, 'contructor', {
  value: Admin,
  enumerable: false,
});

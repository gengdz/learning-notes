// 原型的继承，不是改变构造函数的继承
function User() { }
User.prototype.name = function () {
  console.log("User methed name");
};

let use = new User();

function Admin() { }

// 新的函数的原型等于 User 函数的原型 
// 此种方法只是构造函数的原型被改变
Admin.prototype = User.prototype;
// 此时 Admin 的原型和 User 的原型是同一个对象
// 因此在 Admin 中改变 name 方法时 User 方法中的 name 也会受到影响
Admin.prototype.name = function () {
  console.log("admin methed name");
};

let admin = new Admin();

use.name(); // admin methed name
admin.name(); // admin methed name
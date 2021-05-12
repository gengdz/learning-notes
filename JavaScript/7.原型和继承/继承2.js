
function User() { }
User.prototype.name = function () {
  console.log("User methed name");
};
User.prototype.show = function () {
  console.log("User methed show");
};

let use = new User();

function Admin() { }

// 继承是原型的继承
Admin.prototype.__proto__ = User.prototype;

Admin.prototype.name = function () {
  console.log("admin methed name");
};

let admin = new Admin();

use.name(); // User methed name
admin.name(); // admin methed name
admin.show(); // User methed show
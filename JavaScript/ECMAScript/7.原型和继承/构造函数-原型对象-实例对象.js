function User() { }

console.log(User, User.prototype, User.prototype.constructor);

const user = new User();

User.__proto__.view = function () {
  console.log("User __proto__ function");
};

User.view();

User.prototype.show = function () {
  console.log("User prototype function");
};

user.show();
// user.view(); // 这样就报错了

console.log(user.__proto__ === User.prototype);

console.log(User.prototype.constructor === User);

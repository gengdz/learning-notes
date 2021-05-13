function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.show = function () {
  console.log(this.name, this.age)
}


function admin(name, age) {
  const instance = Object.create(User.prototype);
  User.call(instance, name, age);
  return instance;
}

const a = admin('耿德洲', 18)
a.show()
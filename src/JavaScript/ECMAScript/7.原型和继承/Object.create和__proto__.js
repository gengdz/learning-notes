let user = {
  show() {
    return this.name;
  }
};

// 1.
let u1 = Object.create(user);
u1.name = "u1.耿德洲";
console.log(u1.show());

// 2.
const u2 = Object.create(user, {
  name: {
    value: 'u2.耿德洲'
  }
})
console.log(u2.show());

// 3.
const u3 = {
  name: 'u3.耿德洲'
}

Object.setPrototypeOf(u3, user);
console.log(u3.show());

console.log(Object.getPrototypeOf(u3))
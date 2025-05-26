const name = 'window';

const person = {
  name: 'person',
  sayName: function () {
    console.log(this?.name);
  },
};

function sayName() {
  const sss = person.sayName;
  sss();
  person.sayName();
  person.sayName();
  (b = person.sayName)();
}

sayName();

// window
// person
// window 错误。实际是 person
// window 不知道。

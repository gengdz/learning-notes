const name = 'window';

const person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  },
};

const person2 = { name: 'person2' };

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()();
person1.foo3.call(person2)();
person1.foo3().call(person2);

person1.foo4()();
person1.foo4.call(person2)();
person1.foo4().call(person2);

// person1
// person2
//
// window
// window
//
// person1  错误。应该是 window。返回的是函数，没有绑定 this，默认是 window
// person2  错误。实际是 window。返回的是函数，没有绑定 this，默认是 window
// person2
//
// person1
// person2
// person1
//

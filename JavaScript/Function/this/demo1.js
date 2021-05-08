const person1 = {
  name: 'gdz',
  sayHello() {
    console.log(`你好，${this.name}`, this);

    function f1(params) {
      console.log('f1 的 this', this) // 这里就指向了 window ,它不是对象的方法，就是普通的函数，那么就指向了 window
    }
    f1()

    const f2 = () => {
      console.log(this)
    }
    f2();
  }
}

person1.sayHello();

function User(name) {
  this.name = name;
  this.sayHello = function () {
    console.log(`你好，${this.name}`, this);

    function f1(params) {
      console.log('f1 的 this', this) // 这里就指向了 window ,它不是对象的方法，就是普通的函数，那么就指向了 window
    }
    f1()

    const f2 = () => {
      console.log(this)
    }
    f2();
  }
}

const lisi = new User('李四');
lisi.sayHello();

const obj = {
  qianzhui: 'good',
  lists: ['js', 'ts', 'react'],
  show() {
    return this.lists.map(function (title) {
      console.log('map里面的this', this)
      // 这里的函数是普通的函数，所以它的 this 指向是 window
      return `${this.qianzhui}-${title}`;
    });
  },
  arrowShow() {
    return this.lists.map((title) => {
      console.log('map里面的this', this)
      // 这里的函数是 箭头函数，所以它的 this 继承自父亲，也就是 arrowShow，那么就是这个对象本身
      return `${this.qianzhui}-${title}`;
    });
  }
}

console.log(obj.show());
console.log(obj.arrowShow());
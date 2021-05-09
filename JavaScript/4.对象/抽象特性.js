function User(name, age) {
  this.name = name;
  this.age = age;
  this.show = function () {
    console.log(this.name + this.info())
  }

  this.info = function () {
    return this.age > 50 ? '中老年' : '青年'
  }
}

const u1 = new User('耿德洲');

u1.show();
u1.info = () => '你好'
u1.show();

// 此时，外部可以只有修改我们的函数，如果我们只想暴露 show 方法，应该怎么办呢？

{
  function Person(name, age) {
    const data = { name, age };

    function info() {
      return data.age > 50 ? '中老年' : '青年'
    }

    this.show = function () {
      console.log(data.name + info())
    }

  }

  const p1 = new Person('耿德洲');
  p1.show();
  p1.info = '你好'
  p1.show();
}
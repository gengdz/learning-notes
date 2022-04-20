function User1(name, age) {
  const data = { name, age };
  Object.defineProperties(this, {
    name: {
      get() {
        return data.name;
      },
      set(value) {
        if (value.length < 2) {
          throw new Error('用户名无效')
        };
        data.name = value
      },
      age: {
        get() {
          return data.name;
        },
        set(value) {
          if (value.length < 2) {
            throw new Error('用户名无效')
          };
          data.name = value
        },
      }
    }
  })
}

const u1s = new User1('gdz', 18);
// u1s.name = 's'; // 这里会报错
console.log(u1s.name);


{
  const DATA = Symbol();
  class UserClass {
    constructor(name, age) {
      this[DATA] = { name, age };
    }
    get name() {
      return this[DATA].name;
    }
    set name(value) {
      if (value.trim() == "") throw new Error("无效的用户名");
      this[DATA].name = value;
    }
    get age() {
      return this[DATA].name;
    }
    set age(value) {
      if (value.trim() == "") throw new Error("无效的用户名");
      this[DATA].name = value;
    }
  }

  const u1s = new UserClass('gdz', 18);
  u1s.name = 'class';
  console.log(u1s.name);
}
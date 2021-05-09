const user = {
  data: { name: 'gengdezhou', age: 18 },
  set age(value) {
    if (typeof value !== 'number') {
      throw Error('必须是数字类型');
    }
    this.data.age = value;
  },
  get age() {
    return `年龄是${this.data.age}`
  }
}

console.log(user.age);
user.age = 'sfs';
console.log(user.age)
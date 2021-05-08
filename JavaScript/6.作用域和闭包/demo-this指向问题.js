const obj = {
  user: 'gdz',
  get: function () {
    return function () {
      return this.user
    }
  },
  arrowGet: function () {
    return () => {
      return this.user
    }
  }
};

console.log(obj.get()()) // undefined

// 上面的过程可以写成这种

const a = obj.get();
console.log(a()) // undefined 这里指向 window

console.log(obj.arrowGet()()) // gdz
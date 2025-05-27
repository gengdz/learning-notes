
var obj = {
  a: 1,
  foo: function (b) {
    b = b || this.a
    return function (c) {
      console.log(this.a + b + c)
    }
  }
}
var a = 2
var obj2 = { a: 3 }

obj.foo(a).call(obj2, 1)
obj.foo.call(obj2)(1)

// b=2, this.a = 3 c = 1。也就是 3+2+1
// b = undefined || 3  this.a = 2 c =1 3+2+1。 这里特别要注意的是 foo.call(obj2); 只是传递了 this，但是并没有给参数。

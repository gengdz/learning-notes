
var name = 'window'
var obj1 = {
  name: 'obj1',
  foo2: () => {
    console.log(this.name)
    return function () {
      console.log(this.name)
    }
  }
}
var obj2 = {
  name: 'obj2'
}
obj1.foo2.call(obj2)() // 普通函数谁调用，指向谁；箭头函数使用上下文的 this

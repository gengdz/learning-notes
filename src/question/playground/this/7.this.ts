
var name = 'window'
function Person (name) {
  this.name = name
  this.foo1 = function () {
    console.log(this.name)
  }
  this.foo2 = () => {
    console.log(this.name)
  }
}
var person2 = {
  name: 'person2',
  foo2: () => {
    console.log(this.name)
  }
}
var person1 = new Person('person1')
person1.foo1() // person1
person1.foo2() // person1 . 自己没有 this 继承外层的 this 外层作用域的this 。此时外层作用域为 函数作用域，所以此时是 person1 
person2.foo2() // window 

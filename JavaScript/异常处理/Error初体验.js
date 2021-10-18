const err1 = new Error('aaa');

console.log(err1.name); // Error

console.log('这行代码会执行。Error 就是一个 错误对象，只要不被抛出，就不会产生错误');
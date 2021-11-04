// 原子表 [] 匹配 1 或者 2 或者 3 或者 4 或者 5...
console.log(/[1234567]/.test('adfaddsadfa223fasda'));


const person = `
张三:010-99999999,李四:020-88888888`;
// 除了 : - 数字 , 三
const res = person.match(/[^:-\d,\s]+/g);
console.log(res)



let time = "2022-02-23";

console.log(time.match(/^\d{4}([-\/])\d{2}\1\d{2}$/));


const result = /^[a-zA-Z\d]+\s*[\+\-\*\/]\s*[a-zA-Z\d]+/g.test("a+   b");
console.log(result);
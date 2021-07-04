const str = 'gengdezhou-1122';

const reg = /geng1/;
console.log(reg.test(str));

const reg1 = new RegExp('geng');
console.log('对象的形式创建', reg1.test(str))



// 取出 str 中的数字
const num = [...str].filter(letter => !Number.isNaN(parseInt(letter))).join('');
console.log('nnn', num);

const num1 = str.match(/\d/g).join('');
console.log('nnnnregexp', num1);


// 选择符 ｜ 
const a = /geng|de/.test(str);
console.log('geng|de', a);

const tel = "010-999999";

console.log(/^(010|020)\-\d{1,2}/.test("030-22"));
console.log(/^(010|020)\-\d{1,2}/.test(tel));


const 原子表 = /[1234]/;
console.log(原子表.test("123"), 原子表.test("737"), 原子表.test("98"));

const 原子组 = /(12|34)/;
console.log(原子组.test("123"), 原子组.test("737"), 原子组.test("98"));

const price = 12.34;
console.log(/\d+\.\d+/.test(price), /\d+\.\d+/.test("ab12.34"), /\d+\.\d+/.test("**1234"))

let person = `
张三:010-99999999,李四:020-88888888`;
let res = person.match(/[^:-\d,]+/g);

console.log(res);



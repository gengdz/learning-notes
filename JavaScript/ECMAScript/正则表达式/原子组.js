// 原子组 (aaa|bbb) 匹配 aaa 或者 bbb 其中 aaa bbb 是一个整体
const tel = '010-9999999';
const tel1 = '11111020-9999999aaaabbb'

console.log(/^(010|020)\-\d{7,8}$/.test(tel));

// 010 或者 020 开头的紧跟着-然后是7到8位数字的
console.log(/^(010|020)\-\d{7,8}$/.test(tel1));




let data = `
  #1 js,200元 #
  #2 php,300元 #
  #9 baidu.com # 百度
  #3 node.js,180元 #
`;
// [{name:'js',price:'200元'}]

const lesson = data.match(/^\s*#\d+\s+.+\s*#$/gm).map(v => {
  console.log(v.replace(/(^\s*#\d+|\s*#$)/g, ''))
  const [n, p] = v.replace(/(^\s*#\d+\s*|\s*#$)/g, '').split(',');
  const [name, price] = v.replace(/^\s*#\d+\s*/, '').replace(/\s*#$/, '').split(',');
  return { name, price, n, p }
})

console.log(lesson)

const xingya = "xingya2021.不断学习，加油！";

// 匹配字母
console.log(xingya.match(/\p{L}/gu))

// 匹配标点符号
console.log(xingya.match(/\p{P}/gu))

// 匹配中文
console.log(xingya.match(/\p{sc=Han}/gu))


const reg = /a/g
console.log(reg.exec('abacab'));
console.log(reg.lastIndex)

console.log(reg.exec('abacab'));
console.log(reg.lastIndex)

const regy = /a/y;
console.log(regy.exec('abacab'));
console.log(regy.lastIndex)

console.log(regy.exec('abacab'));
console.log(regy.lastIndex)

console.log(regy.exec('abacab'));
console.log(regy.lastIndex)


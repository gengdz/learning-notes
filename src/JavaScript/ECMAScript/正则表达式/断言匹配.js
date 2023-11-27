const str = "gengdezhou@789xingya666";

// 匹配后面是数字的字符串
console.log(str.match(/[a-z]+(?=\d)/g)); // [ 'xingya' ]

// 匹配后面不是 xingya 的数字
console.log(str.match(/\d+(?!xingya)/g)) // [ '78', '666' ]




const str1 = "gengdezhou789xingya666";

// 匹配前面是 gengdezhou 的字符串
console.log(str1.match(/(?<=gengdezhou)\d+/g)) // [ '789' ]

// 匹配前面不是数字的字符串
console.log(str1.match(/(?<!\d+)[a-z]+/g)) // [ 'gengdezhou', 'ingya' ]

const str = 'gengdezhou'

console.log(str.substring(2, 5), str) //=> ngd gengdezhou // 包括开始不包括结束，不会对
console.log(str.substring(2), str) //=> ngdezhou

console.log(str.substr(2, 3), str) //=> ngd gengdezhou
console.log(str.substr(2), str) //=> ngdezhou gengdezhou


console.log(str.padStart(100, '   xx  '), str);
console.log(str.padEnd(100, '   xx  '), str);
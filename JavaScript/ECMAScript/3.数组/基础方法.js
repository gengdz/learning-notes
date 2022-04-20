const arr = ['a', 'b', 'c'];

console.log(arr.push('1', '2', '3'), arr); // push 从数组尾部增加元素； 返回值为 新数组的元素数量；会改变 原数组


console.log(arr.pop(), arr); // pop 会从尾部删除一个元素，返回值为删除的元素，会改变原数组
console.log(arr.pop(), arr);
console.log(arr.pop(), arr);

console.log(arr.unshift('aa', 'bb', 'cc'), arr);

console.log(arr.shift(), arr);
console.log(arr.shift(), arr);
console.log(arr.shift(), arr);

// console.log(arr.fill('填充'), arr) //=> [ '填充', '填充', '填充' ] [ '填充', '填充', '填充' ]
console.log(arr.fill('填充', 1, 2), arr);

arr.push('d', 'e');

console.log(arr.indexOf('d'), arr); //=> 3 [ 'a', '填充', 'c', 'd', 'e' ]
console.log(arr.indexOf('d', 1), arr); //=> 3 [ 'a', '填充', 'c', 'd', 'e' ]

console.log(arr.lastIndexOf('d'), arr) //=> 3 [ 'a', '填充', 'c', 'd', 'e' ]
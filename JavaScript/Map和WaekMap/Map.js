const map1 = new Map([
  ['string', '字符串作为 key'],
  [(a, b) => a + b, '函数作为 key'],
  [{ name: 'gdz', age: 18 }, '函数作为 key'],
]);
console.log(map1);
console.log(map1.has('string'))
console.log(map1.get('string'))
// map1.delete('string');

// map1.clear();
console.log(map1);

console.log(map1.keys(), map1.values(), map1.entries())

map1.forEach((value, index, map) => console.log(value, index, map));

for (const keyValue of map1.entries()) {
  console.log(keyValue)
}



const map2 = new Map();
map2.set(() => 3, 'sss');
console.log(`map2`, map2);

const 值不能含有字符串 = new Map([...map1].filter(item => !item[1].includes('字符串')));
console.log(值不能含有字符串)




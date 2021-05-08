const log = (desc, data, ...rest) => console.log(`
${desc} -->  ${data}`, ' | ', ...rest)

const arr = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];



// 使用原生 flat 配置 Infinity
const flatten1 = data => data.flat(Infinity);

console.time('flat')
log('flatten1', flatten1(arr), arr);
console.timeEnd('flat')

// 使用 reduce 循环一遍
const flatten2 = data => data.reduce((acc, cur) => {
  return acc.concat(Array.isArray(cur) ? flatten2(cur) : cur)
}, [])

console.time('reduce')
log('flatten2', flatten2(arr), arr);
console.timeEnd('reduce')



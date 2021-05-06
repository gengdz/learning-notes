const log = (desc, ...rest) => console.log(`${desc} --> `, ...rest)

const arr = [1, 1, 'true', 'true', true, true, 15, 15, false, false, undefined, undefined, null, null, NaN, NaN, 'NaN', 0, 0, 'a', 'a', {}, {}];

// 使用 ... + Set
const unique1 = (data) => [...new Set(data)]

log('... + Set', unique1(arr));

// 使用 reduce + includes  两层循环法
const unique2 = (data) => data.reduce((acc, cur) => {
  return acc.includes(cur) ? acc : acc.concat(cur)
}, [])

log('reduce + includes', unique2(arr));

// 使用 filter + indexOf 
const unique3 = (data) => data.filter((item, index, arr) => arr.indexOf(item) === index)

log('filter + indexOf', unique3(arr));
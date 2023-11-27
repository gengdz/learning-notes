const log = (direction = "", logValue) => console.log(`${direction} -->`, logValue)

const arr1 = new Array(5, 2);
const arr2 = new Array(5);
const arr3 = new Array(5).fill('值');;
log('arr1', arr1)
log('arr2', arr2)
log('arr3', arr3)

const arr4 = [1, 2, 3];
arr4.fill('内容')
log('arr4', arr4);


const data = {
  0: 'a',
  1: 'b',
  length: 5,
}
const arrFrom = Array.from(data);
log('arrFrom', arrFrom)

const sortData = [1, 2, 39, 4, 5, 6];

const sortedData = sortData.sort((a, b) => a - b);

log('srotedData', sortData)

// splice
const arr = [0, 1, 2, 3, 4, 5, 6];

// console.log(arr.splice(), arr); // 没有变化
// console.log(arr.splice(1), arr); // 只有开始位置，没有删除数量的话，后面的都会被删除，返回值为被删除的元素
// console.log(arr.splice(10), arr) // 没有变化
// console.log(arr.splice(10, 0, 11, 22, 33, 44), arr) // 从结束位置添加这个元素
// console.log(arr.splice(1, 2), arr) // 从索引为 1 的位置，删除 2 个元素
// console.log(arr.splice(1, 1, "a"), arr); // 从索引为 1 的位置，删除 1 个元素，并且在删除的位置上在添加一个元素
// console.log(arr.splice(1, 0, 'a', 'b', 'c'), arr) // 从索引为 1 的位置，删除 0 个元素，再添加几个元素
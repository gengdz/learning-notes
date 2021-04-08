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
function quickSort(list: number[]): number[] {
  if (list.length <= 1) return list;

  const index = Math.floor(list.length / 2);
  const pivot = list.splice(index, 1)[0];

  const left = [], right = [];

  list.forEach(item => {
    if (item < pivot) {
      left.push(item);
    } else {
      right.push(item);
    }
  });

  return quickSort(left).concat(pivot).concat(quickSort(right))
}

const list = [2, 9, 5, 7, 3, 4, 6];
const sortedData = quickSort(list);

console.log(sortedData, list)

export { }



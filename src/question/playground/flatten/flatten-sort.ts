export {};

const arr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
// newArr = [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10, 11, 12, 13, 14];

function flatten(arr: unknown[]) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const res = flatten(arr[i]);
      result.push(...res);
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function flattenBfs(arr: unknown) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.shift();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.push(item);
    }
  }
  return result;
}

const flattenAndSort = (arr: unknown[]) => flatten(arr).sort((a, b) => a - b);

// console.log('flattenAndSort', flattenAndSort(arr));

console.log('fffffBfs', flattenBfs(arr));

const flattenBfsAndSort = (arr: unknown[]) =>
  flattenBfs(arr).sort((a, b) => a - b);

console.log('flattenBfsAndSort', flattenBfsAndSort(arr));

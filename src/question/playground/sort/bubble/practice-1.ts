export {};

// 每次把一个最大值排到最后。
// 冒泡排序
const bubbleSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
};

console.log(bubbleSort([3, 6, 2, 4, 1]));

export {};

// 🚀 选择排序（Selection Sort）详解
// 选择排序（Selection Sort）是一种简单直观的排序算法，其核心思想是每次从未排序的部分中找到最小（或最大）的元素，将其放到已排序部分的末尾。
// 这个过程类似于从一堆牌中每次选出最小的牌放到左边。
//
// ✅ 核心思路
// 初始状态：将数组分为已排序部分和未排序部分，初始时已排序部分为空。
// 迭代过程：
//  * 在未排序部分中找到最小元素；
//  * 将该元素与未排序部分的第一个元素交换位置；
//  * 已排序部分扩大一个元素，未排序部分缩小一个元素；
// 最终结果：所有元素都被正确放置，整个数组变为有序。

const selectionSort = (arr: number[]) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
    }
  }

  return arr;
};

console.log(selectionSort([3, 6, 2, 4, 1]));

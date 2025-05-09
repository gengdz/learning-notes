// 数据打印，左下角到右上角
const matrixData = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
// 期望的输出 [7,4,8,1,5,9,2,6,3]

// row 2, col 2

// 7: (2,0) 2
// 4: (1,0) 1
// 8: (2,1) 1
// 1: (0,0) 0
// 5: (1,1) 0
// 9: (2,2) 0
// 2: (0,1) -1
// 6: (1,2) -1
// 3: (0,2) -2

/**
 * 思路：
 * 1. 按照 row-col 为key 把数据分组
 * 2. 按照 键降序排序
 * 3. 拼接结果
 */
const printMatrix = (data: Array<number[]>) => {
  const groups = {};

  for (let row = 0; row < data.length; row++) {
    const rowData = data[row];
    for (let col = 0; col < rowData.length; col++) {
      const colValue = rowData[col];
      if (groups[row - col]) {
        groups[row - col].push(colValue);
      } else {
        groups[row - col] = [colValue];
      }
    }
  }

  return Object.entries(groups)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .flatMap(([key, value]) => value);
};

const matrix4x4 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log('左下角-》右上角：', printMatrix(matrixData));
console.log('左下角-》右上角：', printMatrix(matrix4x4));

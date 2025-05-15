export {};
// 螺旋打印矩阵
const matrixData = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
// 期望的输出 [1,2,3,6,9,8,7,4,5]

/**
 * 思路：
 */
const spiralOrder = (matrix: number[][]) => {
  const result = [];
  let rowStart = 0;
  let rowEnd = matrix.length - 1;
  let colStart = 0;
  let colEnd = matrix[0].length - 1;

  while (rowStart <= rowEnd && colStart <= colEnd) {
    // 从左到右
    for (let i = colStart; i <= colEnd; i++) {
      result.push(matrix[rowStart][i]);
    }
    rowStart++;

    if (rowStart > rowEnd) break;

    // 从上到下
    for (let i = rowStart; i <= rowEnd; i++) {
      result.push(matrix[i][colEnd]);
    }
    colEnd--;
    if (colStart > colEnd) break;

    // 从右到左
    for (let i = colEnd; i >= colStart; i--) {
      result.push(matrix[rowEnd][i]);
    }
    rowEnd--;
    if (rowStart > rowEnd) break;

    // 从下到上
    for (let i = rowEnd; i >= rowStart; i--) {
      result.push(matrix[i][colStart]);
    }
    colStart++;
  }
  return result;
};

const matrix4x4 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];

console.log('左下角-》右上角：', spiralOrder(matrixData));
console.log('左下角-》右上角：', spiralOrder(matrix4x4));

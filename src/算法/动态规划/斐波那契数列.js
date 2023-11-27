// 斐波那契数列
// 1 1 2 3 5 8 13 21

// 动态规划方式
function fibDp(n) {
  if (n < 1) return 0;
  if ([1, 2].includes(n)) return 1;

  const arr = new Array(n + 1).fill(0);
  arr[1] = arr[2] = 1;

  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2]
  }
  return arr[n]
}
console.log('fibDp', fibDp(68))


// 优化空间复杂度
function fibDpSpace(n) {
  if (n < 1) return 0;
  if ([1, 2].includes(n)) return 1;


  let prev = 1, curr = 1;
  for (let i = 2; i <= n; i++) {
    const sum = prev + curr;
    prev = curr;
    curr = sum;
  }
  return curr;

}

console.log('fibDpSpace', fibDp(68))
/**
 * 
 * @param {number[]} coins 硬币面额列表
 * @param {number} amount 需要凑出的金额
 * @returns 
 */
function coinChange(coins, amount) {

  const res = new Array(amount + 1).fill(amount + 1);
  res[0] = 0;

  for (let i = 0; i <= amount; i++) {
    for (let coin of coins) {
      // 值问题无解，跳过
      if (i - coin < 0) continue;
      // 状态转移
      res[i] = Math.min(res[i], 1 + res[i - coin])
    }
  }

  return res[amount] === amount + 1 ? -1 : res[amount];

}

console.log(coinChange([1, 2, 5], 0))
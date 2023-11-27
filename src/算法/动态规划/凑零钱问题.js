/**
 * 
 * @param {number[]} coins 硬币面额列表
 * @param {number} amount 需要凑出的金额
 * @returns 
 * @description
 *  1. 先初始化一个数组用来做做记录，填充程序无法达到的初始值,这里初始化为 amount + 1，也就是 12。
 *  2. 状态转移公式是：我如果想计算 11，那么我只需要计算 10（11-1），9（11-2），6（11-5），然后在这些值的基础上加 1 枚硬币即可。
 *     问题转移成求解 10，9，6 的最优解，（这里就是重叠值问题出现的地方，因为 10 也要分解为 9，8，4，也有 9）
 *  3. 怎么取值呢，比较每种硬币情况下，和上次的最有解 + 1 进行比较。
 *      当金额为 1 的时候，只需要比较 min(12, 1)，得出 1，目前的 res = [0, 1];
 *      当金额为 2 的时候，需要先比较 min(12, 1+res[2-1])，得出 res = [0, 1, 2]; 循环硬币，那么需要比较 min(2,1+res[2-2]),得出 res =[0, 1, 1];
 * `  依次类推
 *
 */
function coinChange(coins, amount) {
  const res = new Array(amount + 1).fill(amount + 1);
  res[0] = 0; // base case

  for (let i = 0; i <= amount; i++) {
    for (let coin of coins) {
      // 值问题无解，跳过
      if (i - coin < 0) continue;
      console.log(i, coin, res[i], res)
      // 状态转移
      res[i] = Math.min(res[i], 1 + res[i - coin])
    }
  }
  return res[amount] === amount + 1 ? -1 : res[amount];
}

console.log(coinChange([1, 2, 5], 2))
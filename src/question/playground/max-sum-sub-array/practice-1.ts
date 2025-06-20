export {};

// 最大子数组和 https://leetcode.cn/problems/maximum-subarray/description/

// 输入一个整数数组 nums ，找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。使用 ts 实现
// 示例 1：
// 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
// 输出：6
// 解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
// 示例 2：
// 输入：nums = [1]
// 输出：1
// 示例 3：
// 输入：nums = [5,4,-1,7,8]
// 输出：23

// 这里要用到 Kadane 算法。
// 如果之前的和 + 当前值 < 当前值 就说明需要从当前值开始重新记录了。

function maxSumSubArray(nums: number[]): number {
  let currentMax = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    globalMax = Math.max(globalMax, currentMax);
  }
  return globalMax;
}

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log('mmmm', maxSumSubArray(nums));

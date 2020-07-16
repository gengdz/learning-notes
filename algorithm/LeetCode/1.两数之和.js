/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const map = new Map();
  return nums.reduce((acc, current, index) => {
    const remain = target - current;
    if (map.has(remain)) {
      acc = [map.get(remain), index];
    } else {
      map.set(current, index);
    }
    return acc
  }, [])
};
// @lc code=end


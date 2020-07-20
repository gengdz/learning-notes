/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring = function (s) {
  const map = new Map();
  [...s].reduce((acc, cur) => {
    if (acc.includes(cur)) {
      const data = acc.length > (map.get(0) || [].length) ? acc : map.get(0);
      console.log('data:', data);
      map.set(0, data);
      const index = acc.findIndex(v => v === cur);
      acc = acc.slice(index + 1).concat(cur);
      console.log('acc: ', acc)
    } else {
      acc = acc.concat(cur);
    }
    console.log('map.get(0)', map.get(0))
    return acc;
  }, [])
  return map.get(0).length;

};
lengthOfLongestSubstring('pwwkew')
// @lc code=end


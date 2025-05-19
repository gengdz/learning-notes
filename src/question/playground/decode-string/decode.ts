// https://leetcode.cn/problems/decode-string/description/

/*
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 * */

// 样例输入：s = "3[a2[c]]"

// 样例输出：accaccacc

const decodeString = (s = '3[a2[c]]') => {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ']') {
      stack.push(s[i]);
    } else {
      let unitStr = '';

      let cur = stack.pop();
      while (cur !== '[') {
        unitStr = cur.concat(unitStr);
        cur = stack.pop();
      }

      cur = stack.pop();
      let count = '';
      while (!isNaN(Number(cur))) {
        count = cur.concat(count);
        cur = stack.pop();
      }

      const countUnitStr = unitStr.repeat(Number(count));
      stack.push(cur, countUnitStr);
    }
  }
  return stack.join('');
};

// 之前记录的版本。
const decodeString1 = (str = '3[a2[c]]') => {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ']') {
      stack.push(str[i]);
    } else {
      let decodeStr = '';
      let count = '';

      while (stack.length && stack[stack.length - 1] !== '[') {
        decodeStr = stack.pop() + decodeStr;
      }
      stack.pop();
      while (stack.length && !isNaN(stack[stack.length - 1])) {
        count = stack.pop() + count;
      }

      stack.push(decodeStr.repeat(parseInt(count) || 1));
    }
  }

  return stack.join();
};

const decodeString2 = (str = '3[a2[c]]') => {
  const stack: string[] = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ']') {
      let decodeStr = '';
      let count = '';

      while (stack.length && stack[stack.length - 1] !== '[') {
        decodeStr = stack.pop().concat(decodeStr);
      }
      stack.pop();
      while (stack.length && !isNaN(Number(stack[stack.length - 1]))) {
        count = stack.pop() + count;
      }

      stack.push(decodeStr.repeat(parseInt(count) || 1));
    } else {
      stack.push(str[i]);
    }
  }
  return stack.join('');
};

console.log('decodeString--->', decodeString());

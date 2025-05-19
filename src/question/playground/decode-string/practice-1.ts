export {};
const decodeString = (str = '3[a2[c]]') => {
  const stack: string[] = [];

  for (let i = 0; i < str.length; i++) {
    let decodeStr = '';
    let count = '';
    if (str[i] !== ']') {
      stack.push(str[i]);
    } else {
      while (stack.length && stack.at(-1) !== '[') {
        decodeStr = stack.pop().concat(decodeStr);
      }

      stack.pop();
      while (stack.length && !isNaN(Number(stack.at(-1)))) {
        count = stack.pop().concat(count);
      }

      stack.push(decodeStr.repeat(Number(count) || 1));
    }
  }

  return stack.join('');
};

console.log('decodeString--->', decodeString('3[a]2[bc]'));
console.log('decodeString--->', decodeString('2[abc]3[cd]ef'));

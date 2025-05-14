// 示例：6.0 > 5.0.2 > 5.0.1 > 5.0.1.beta.3 > 5.0.0

const compareVersion = (v1: string, v2: string) => {
  const parts1 = v1.split('.');
  const parts2 = v2.split('.');

  for (let i = 0; i <= Math.max(parts1.length, parts2.length); i++) {
    const num1 = parts1[i] === 'beta' ? -1 : parseInt(parts1[i]);
    const num2 = parts2[i] === 'beta' ? -1 : parseInt(parts2[i]);

    if (num1 !== num2) {
      return num1 - num2 > 0 ? 1 : -1;
    }
  }

  return 0;
};

// console.log('比较版本号---》', compareVersion('6.0', '5.0.2'));
// console.log('比较版本号---》', compareVersion( '5.0.2','6.0'));
// console.log('比较版本号---》', compareVersion('5.0.2', '5.0.1'));
console.log('比较版本号---》', compareVersion('5.0.1.beta.3', '5.0.1'));

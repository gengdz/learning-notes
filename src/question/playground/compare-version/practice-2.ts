export {};
// 示例：6.0 > 5.0.2 > 5.0.1 > 5.0.1.beta.3 > 5.0.0
// 输入为 const versions = ['5.0.0', '5.0.2', '6.0', '5.0.1.beta.3', '5.0.1'];
// 输出为 const sortedVersions = ['6.0', '5.0.2', '5.0.1', '5.0.1.beta.3', '5.0.0'];

const versions = ['5.0.0', '5.0.2', '6.0', '5.0.1.beta.3', '5.0.1'];

const compareVersion = (v1: string, v2: string) => {
  const parts1 = v1.split('.');
  const parts2 = v2.split('.');
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const num1 = parts1[i] === 'beta' ? -1 : parseInt(parts1[i]);
    const num2 = parts2[i] === 'beta' ? -1 : parseInt(parts2[i]);
    if (num1 !== num2) {
      return num1 - num2;
    }
  }
  return 0;
};

const sortVersions = (versions: string[]) => versions.sort(compareVersion);

console.log('sortVersions--->', sortVersions(versions));

export {};
// 示例：6.0 > 5.0.2 > 5.0.1 > 5.0.1.beta.3 > 5.0.0
// 输入为 const versions = ['5.0.0', '5.0.2', '6.0', '5.0.1.beta.3', '5.0.1'];
// 输出为 const sortedVersions = ['6.0', '5.0.2', '5.0.1', '5.0.1.beta.3', '5.0.0'];

const versions = ['5.0.0', '5.0.2', '6.0', '5.0.1.beta.3', '5.0.1'];

const sortVersions = (versions: string[]) => {};

console.log('sortVersions--->', sortVersions(versions));

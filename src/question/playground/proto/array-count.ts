// 输入：
// 1 2 3
// const arr = [true, null, {}];
// arr.count().then(total => {console.log(total)});

// 输出：
// 一秒后输出 "total: 1, value: true",
// 再等待一秒后输出 "total: 3, value: null",
// 再等待一秒后输出 "total: 6, value: {}",
// 立即输出 "6"

export {};

Array.prototype.count = function () {
  let total = 0;
  return new Promise((resolve, reject) => {
    this.forEach((value, index) => {
      setTimeout(
        () => {
          if (typeof value === 'boolean') {
            total += 1;
          }
          if (value === null) {
            total += 2;
          }
          if (Object.prototype.toString.call(value) === '[object Object]') {
            total += 3;
          }
          console.log(`total: ${total}, value: ${JSON.stringify(value)}`);
          if (index === this.length - 1) {
            resolve(total);
          }
        },
        1000 * (index + 1),
      );
    });
  });
};

const arr = [true, null, {}];

arr.count().then(console.log);

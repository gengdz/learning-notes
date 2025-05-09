export {};

// ## 实现一个并发请求函数 concurrencyRequest(urls, maxNum)
//
// 要求如下：
//
// - 要求最大并发数 maxNum;
// - 每当有一个请求返回，就留下一个空位，可以增加新的请求；
// - 所有请求完成后，结果按照 urls 里面的顺序依次打出；成功了就放成功结果，失败了就放错误结果

async function concurrencyRequest(urls, maxNum) {
  return new Promise((resolve) => {
    const results = new Array(urls.length).fill(null); // 创建结果数组并填充 null，保证长度一致
    let executingCount = 0; // 使用计数器来跟踪正在执行的请求
    let cursor = 0; // 创建一个游标来跟踪当前处理的 URL 的索引
    const run = async (url, index) => {
      executingCount++; // 增加执行请求的计数器
      try {
        console.log(`请求 ${url} 开始，当前并发数：${executingCount}`);
        const response = await mockRequest(url);
        results[index] = response; // 将结果存储在正确的位置
      } catch (error) {
        results[index] = error; // 错误也按顺序存储
      } finally {
        executingCount--; // 请求完成后减少计数器
        // 检查是否需要启动下一个请求
        if (cursor < urls.length && executingCount < maxNum) {
          const nextUrl = urls[cursor];
          run(nextUrl, cursor); // 开始新的请求
          cursor++;
        }
        // 如果所有请求都已经完成，resolve promise
        if (cursor === urls.length && executingCount === 0) {
          resolve(results);
        }
      }
    };
    // 初始化时，执行最多 maxNum 个请求
    while (cursor < urls.length && executingCount < maxNum) {
      run(urls[cursor], cursor);
      cursor++;
    }
  });
}

// 使用
const urls = [
  'url1',
  'url2',
  'url3',
  'url4',
  'url5',
  'url6',
  'url7',
  'url8',
  'url9',
  'url10',
  'url11',
];
const maxNum = 3;

concurrencyRequest(urls, maxNum)
  .then((results) => {
    console.log('结果', results);
  })
  .catch((error) => {
    console.error('发生错误：', error);
  });

function mockRequest(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Response from ${url}`);
    }, Math.random() * 2000);
  });
}

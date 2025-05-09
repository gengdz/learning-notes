// ## 实现一个并发请求函数 concurrencyRequest(urls, maxNum)
//
// 要求如下：
//
// - 要求最大并发数 maxNum;
// - 每当有一个请求返回，就留下一个空位，可以增加新的请求；
// - 所有请求完成后，结果按照 urls 里面的顺序依次打出；成功了就放成功结果，失败了就放错误结果

function concurrentRequest(urls, maxNum) {
  return new Promise((resolve) => {
    let result = [];
    let index = 0;
    let count = 0;

    async function request() {
      const i = index;
      const url = urls[i];
      index++;
      try {
        const res = await fetch(url);
        result[i] = res;
      } catch (error) {
        result[i] = error;
      } finally {
        count++;

        if (count === urls.length) {
          resolve(result);
        }

        if (index < urls.length) {
          request();
        }
      }
    }

    for (let i = 0; i < Math.min(urls.length, maxNum); i++) {
      request();
    }
  });
}

export {};

const all = (promises: Promise<unknown>[]) => {
  return new Promise((resolve, reject) => {
    const result = [];
    let resovedCount = 0;
    promises.forEach((promise, i) => {
      promise
        .then((value) => {
          result[i] = value;
          resovedCount += 1;
          if (resovedCount === promises.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
};

const allUseFor = (promises: Promise<unknown>[]) => {
  return new Promise((resolve, reject) => {
    const result = [];
    let resovedCount = 0;
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i];
      promise
        .then((value) => {
          result[i] = value;
          resovedCount += 1;
          if (resovedCount === promises.length) {
            resolve(result);
            return;
          }
        })
        .catch(reject);
    }
  });
};

const req1 = fetch(`https://jsonplaceholder.typicode.com/todos/1`).then((res) =>
  res.json(),
);
const req2 = fetch(`https://jsonplaceholder.typicode.com/todos/2`).then((res) =>
  res.json(),
);
const req3 = fetch(`https://jsonplaceholder.typicode.com/todos/3`).then((res) =>
  res.json(),
);

const reqError = () =>
  Promise.reject({ success: false, error: '这是一个错误' });

all([req1, req2, reqError(), req3])
  .then((value) => console.log('Promise.all then--->', value))
  .catch((reason) => console.log('Promise.all catch--->', reason));

export {};

const race = (promises: Promise<unknown>[]) => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch(reject);
    });
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

race([req1, req2, req3])
  // race([req1,reqError(), req2, req3])
  .then((value) => console.log('Promise.all then--->', value))
  .catch((reason) => console.log('Promise.all catch--->', reason));

// 在一个段时间内，如果重复发起了请求，那么只有距离上一次发送请求的时间大于 wait time 的时候，才去发起下一次请求。
// 也就是在 wait 的时间内会发一次且就一次请求。

const throttle1 = (fn, wait = 0) => {
  let previous = 0;
  return function (...args) {
    let context = this;
    let now = Date.now();
    if (now - previous > wait) {
      fn.apply(context, args);
      previous = Date.now();
    }
  };
};

const throttle = (fn, wait = 0) => {
  let timeoutId = 0;
  return function (...args) {
    let context = this;
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        fn.apply(context, args);
        timeoutId = 0;
      }, wait);
    }
  };
};

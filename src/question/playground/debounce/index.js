// 在一个段时间内，如果重复发起了请求，那么只有当间隔时间大于 wait time 的时候，才去发起一次请求。

const debounce = (fn, wait = 0) => {
  let timeoutId = null;

  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    let ctx = this;

    timeoutId = setTimeout(() => {
      fn.apply(ctx, args);
    }, wait);
  };
};

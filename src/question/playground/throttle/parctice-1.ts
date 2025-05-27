const throttle = (fn, wait = 0) => {
  let timeoutId = null;
  return (...args) => {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
        timeoutId = null;
      }, wait);
    }
  };
};

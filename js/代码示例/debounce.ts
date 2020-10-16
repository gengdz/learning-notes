function myDebounce(func: Function, wait: number) {
  let timeout: number;
  return function (...args) {
    let context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait);
  }
}
// debounce的特征是：更新定时器
function myDebounce(func: Function, wait: number) {
  let timeout: number;
  return function (...args: any[]) {
    let context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait);
  }
}

// 立即执行一次函数，然后等到停止触发 wait 秒后，才可以重新触发执行
function myDebounceImmediate1(func: Function, wait: number, immediate: boolean) {
  let timeout: number | null;
  return function (...args: any[]) {
    let context = this;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 这种方式，只会立即执行一次
      immediate = false;
      func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}


// 立即执行版 会有多次立即执行
function myDebounceImmediate2(func: Function, wait: number, immediate: boolean) {
  let timeout: number;
  return function (...args: any[]) {
    let context = this;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 这种方式，每防抖成功之后，都会再执行一次
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = 0;
        func.apply(context, args); // 最后一次也执行
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

// 立即执行 + 取消 + 返回值
function myDebounceImmediate3(func: Function, wait: number, immediate: boolean) {
  let timeout: number;
  let result: any;
  let debounced: any = function (...args: any[]) {
    let context = this;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      // 这种方式，每防抖成功之后，都会再执行一次
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = 0;
        func.apply(context, args); // 最后一次也执行
      }, wait);
      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        result = func.apply(context, args);
      }, wait);
    }
    return result;
  };
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  }
  return debounced;
}
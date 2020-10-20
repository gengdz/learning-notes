
// 1.时间戳的方式 
// 刚进去的时候立即执行
function throttleTimeType(func: Function, wait: number) {
  let previous = 0;
  return function (...args: any[]) {
    let now = Date.now();
    let context = this;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}



// 2.定时器的方式
function throttleTimeout(func: Function, wait: number) {
  let timeout: number;
  return function (...args: any[]) {
    let context = this;
    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, args);
        timeout = null;
      }, wait);
    }
  }
}

interface IOptions {
  leading?: boolean;
  trailing?: boolean;
}


// 3.两种方式结合 想要实现的效果是：刚进去的时候不调用，最后一次调用
function myThrottle(func: Function, wait: number, options: IOptions = {}) {
  const { leading, trailing } = options;
  let timeout: number;
  let previous = 0;
  return function (...args: any[]) {
    let context = this;
    const now = Date.now();
    if (now - previous > wait && leading) {
      func.apply(context, args);
      previous = now;
    }

    if (!timeout) {
      timeout = setTimeout(() => {
        func.apply(context, args);
        timeout = null;
      }, wait);
    }
  }
}



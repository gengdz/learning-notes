class MyPromise {
  static PENDING = 'pending';

  static FULFILLED = 'fulfilled';

  static REJECTED = 'rejected';

  private status: string;

  private value: any;

  private callbacks: any[];

  constructor(executor) {
    this.status = MyPromise.PENDING;
    this.value = null;
    this.callbacks = [];
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  private resolve(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
      setTimeout(() => {
        this.callbacks.forEach(callback => {
          callback.onFulfilled(value);
        });
      });
    }
  }

  private reject(reason) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = reason;
      setTimeout(() => {
        this.callbacks.forEach(callback => {
          callback.onRejected(reason);
        });
      });
    }
  }

  then(onFulfilled?: any, onRejected?: any) {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = () => this.value;
    }
    if (typeof onRejected !== 'function') {
      onRejected = () => this.value;
    }
    const promise = new MyPromise((resolve, reject) => {
      if (this.status === MyPromise.PENDING) {
        this.callbacks.push({
          onFulfilled: value => {
            this.parse(promise, onFulfilled(value), resolve, reject);
          },
          onRejected: value => {
            this.parse(promise, onRejected(value), resolve, reject);
          },
        });
      }
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        });
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        });
      }
    });
    return promise;
  }

  catch(onrejected) {
    return this.then(undefined, onrejected);
  }

  private parse(promise, result, resolve, reject) {
    if (promise === result) {
      throw new TypeError('Chaining cycle detected');
    }
    try {
      if (result instanceof MyPromise) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      reject(value);
    });
  }

  static all(promises) {
    const values = [];
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(value => {
          values.push(value);
          if (values.length == promises.length) {
            resolve(values);
          }
        }, reject);
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject);
      });
    });
  }
}

const mp1 = new MyPromise((resolve, reject) => resolve('1ab'));

const mp2 = new MyPromise((resolve, reject) => {
  setTimeout(() => 2, 100);
});

const mp3 = new MyPromise((resolve, reject) => {
  setTimeout(() => reject(new Error('fail')), 1000);
});

mp3.catch(console.log);

const p1 = new Promise((resolve, reject) => resolve('2b'));

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fail')), 1000);
});
p2.catch(console.log);

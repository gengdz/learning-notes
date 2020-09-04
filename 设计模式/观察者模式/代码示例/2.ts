type TObserver = (message: any) => any;

// 被观察者
class Observable {
  private observers: TObserver[] = [];

  subscribe(observer: TObserver) {
    if (typeof observer === 'function') {
      this.observers.push(observer);
    } else {
      throw new Error('observer 必须是 function')
    }
  }

  unSubscribe(observer: TObserver) {
    this.observers.splice(this.observers.indexOf(observer), 1)
  }

  notify(message: any) {
    this.observers.forEach(observer => {
      observer(message);
    })
  }
}

// 观察者
const observer1: TObserver = message => console.log(`observer1 收到了：${message}`);
const observer2: TObserver = message => console.log(`observer2 收到了：${message}`);

// 测试
const observable = new Observable();
observable.subscribe(observer1);
observable.subscribe(observer2);

observable.notify('111');
console.log('----------------------------')

setTimeout(() => {
  observable.notify('222');
  console.log('----------------------------')
}, 2000);

setTimeout(() => {
  observable.unSubscribe(observer2)
  observable.notify('333');
  console.log('----------------------------')
}, 4000);

export { };
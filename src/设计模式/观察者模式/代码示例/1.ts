class Observable {
  private observers: Observer[] = [];

  // constructor() {
  //   this.observers = [];
  // }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unSubscribe(observer: Observer) {
    this.observers.splice(this.observers.indexOf(observer), 1)
  }

  notify(message: any) {
    this.observers.forEach(observer => {
      observer.update(message);
    })
  }
}

class Observer {
  private name: string;
  private subject: Observable;
  constructor(name: string, observable: Observable) {
    this.name = name;
    this.subject = observable;
    this.subject.subscribe(this);
  }

  update(message) {
    console.log(`${this.name} 收到了通知：${message}`)
  }
}

// 测试
const observable = new Observable();
const observer1 = new Observer('observer1', observable);
const observer2 = new Observer('observer2', observable);
const observer3 = new Observer('observer3', observable);

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

export { Observable };
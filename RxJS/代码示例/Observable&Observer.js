// 说明： 这个是 Ben Lesh 的实现
class SafeObserver {

  // destination 目的地
  constructor(destination) {
    this.destination = destination;
  }

  next(value) {
    if (this.destination.next && !this.isUnsubscribed) {
      this.destination.next(value);
    }
  }

  error(err) {
    if (!this.isUnsubscribed) {
      if (this.destination.error) {
        this.destination.error(err);
      }
      this.unsubscribe();
    }
  }

  complete() {
    if (!this.isUnsubscribed) {
      if (this.destination.complete) {
        this.destination.complete();
      }
      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.isUnsubscribed = true;
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
}

class Observable {

  constructor(_subscribe) {
    this._subscribe = _subscribe;
  }

  subscribe(observer) {
    const safeObserver = new SafeObserver(observer);
    safeObserver._unsubscribe = this._subscribe(safeObserver);
    return () => safeObserver.unsubscribe();
  }

}

const simpleObservable = new Observable((observer) => {
  let i = 0;

  const id = setInterval(() => {
    if (i < 10) {
      observer.next(i++);
    } else {
      observer.complete();
      observer.next('stop me!');
      clearInterval(id);
    }
  }, 500);

  return () => {
    console.log('disposed!');
    clearInterval(id);
  }
});

const observer = {
  next: value => console.log(`next -> ${value}`),
  error: () => { },
  complete: () => console.log('complete')
};

const unsubscribe = simpleObservable.subscribe(observer);

setTimeout(unsubscribe, 4500);

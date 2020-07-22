# RxJS: Reactive Extensions For JavaScript

这也被称为 Functional Reactive Programming，更切确地说是指 Functional Programming 及 Reactive Programming 两个编程思想的结合。
RxJS提供了一套完整的异步解决方案，让我们在面对各种异步行为时，能使用相同的API。
前端中的异步有：事件（event) 、AJSX、动画（animation)、定时器（timer）

## 为什么使用 RxJS




## RxJS是什么？
RxJS是一套借由 **Observable sequences** 来组合 **非同步行为** 和 **事件基础** 程序的库
两种模式的结合，**观察者模式**， **迭代器模式**。

*RxJS* 有**一个核心三个重点**。
一个核心是：*Observable* 再加上相关的 operators。
三个重点：
* Observer(观察者)
* Subject(订阅者)
* Schedulers



## Observable?
在 *RxJS* 中 *Observable* 是可观察对象。
Observable可以确切的表达为 *Observable Stream* 也就是Rx的响应式数据流。



### 建立Observable
#### 使用 `new Observable` 的方式
```javascript
const source$ = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
});

source$.subscribe(item => console.log(item));
```



#### 使用提供的创建方法。
注意这些创建方法是从 **rxjs** 中导入的，而不是 **rxjs/operators**。
1. `of`
```javascript
import {of} from 'rxjs';
const source$ = of(1,2,3);
```

2. `from`
from 可以将可遍历的对象，转化成一个Observable,字符串也可以。
```javascript
import {from} from 'rxjs'
const source$ = from([1,2,3]);
```

3. `fromEvent`
用DOM事件创建。第一个参数为 DOM对象，第二个参数为事件名称。

4. `fromEventPattern`
将添加事件处理器、删除事件处理器的 API转成 Observable。

5. `interval`
参数为间隔时间，每隔多少ms就发出一个从0开始递增的整数。
```javascript
interval(1000).subscribe(console.log);
```

5. `timer`
接收两个参数，第一个参数为发出第一个值需要等待的时间，第二个参数表示之后的间隔时间。
```javascript
timer(1000) // 表示1000ms之后产生一个数据0，然后终结
timer(3000,1000).subscribe(console.log); // 3000ms后吐出0，4000ms吐出1，5000ms吐出2，依次类推
```

6. `range`
产生范围之间正整数。
```javascript
range(1,100) // 产生 1 到 100 的正整数
```

7. `defer`
特点是: 只有订阅的时候才会创建我们真正想要的Observable。
```javascript
defer(()=>ajax(ajaxUrl))
```



## Observer
Oberservable可以被订阅(subscribe),或者说可以被观察，而**订阅Obervable的对象 又称为观察者**。
观察者是一个具有三个方法的对象。每当 *Observable* 发生事件时，便会呼叫观察者相对应的方法。 



### observer的三个方法
一、第一种对象的写法
```javascript
const observer = {
  next: value => console.log(value),
  error: error=> console.log(error),
  complete: () => console.log('complete')
}
```

二、还有一种方式，不用构建对象，而是直接把函数作为 *subscribe* 方法的参数。
```javascript
source$.subscribe(
  value => console.log(value),
  error => console.log(error),
  () => console.log('complete')
)
```

> 1. 注意 *error* 之后不会再调用 *complete*。
> 2. 参数依次是 `next | error | complete` 后面两个参数可以省略。



### 退订 (unsubscribe)
观察者想退订的话，只要调用订阅返回的对象的 *unsubscribe* 方法
```javascript
const subscription = source$.subscribe(observer);
subscription.unsubscribe()
```



## Subscription (订阅)
Subscription表示可清理资源的对象，基本上只有一个 `unsubscribe()` 方法。这个函数用来释放资源或者去取消 *Observable* 执行。



## Subject
每个 observable 是可以多次订阅的。而且多个订阅是分开执行完全独立的。
有些情况下，我们希望第二次订阅 source 不要从头开始接收元素，而是从第一次订阅到当前处理的元素开始发送，我们把这种处理方式称为**组播(multicast)**。

思路：为了实现上述需求。我们可以建立一个中间人来订阅 source 再由中间人转送资料出去，就可以达到我们想要的效果。
实现：这个中间人就是 *Subject*, 它即是一个 *Observer* 订阅 source, 又是一个 *Observable*,可以被别人订阅(内部维护一个订阅者清单)。

```javascript
class MyButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.subject = new Rx.Subject();

        this.subject
            .mapTo(1)
            .scan((origin, next) => origin + next)
            .subscribe(x => {
                this.setState({ count: x })
            })
    }
    render() {
        return <button onClick={event => this.subject.next(event)}>{this.state.count}</button>
    }
}
```
> 由于React本身API的原因，我们没办法直接使用的Observable 的创建符，创建 Observable,这时候就可以使用 Subject来做这件事



### BehaviorSubject
有时候我们会希望 Subject 能代表当前的状态，而不是单纯的事件发送，也就是说如果今天有一个新的订阅，我们希望 Subject 能立即给出最新的值，而不是没有回应。（你不看直播，也没看录播，没关系，只要你关注了LOL，你就能收到比赛的结果）
BehaviorSubject 类似于状态 一开始可以提供默认状态，之后订阅之后都可以获取最新的状态

```javascript
import { BehaviorSubject } from 'rxjs';
const subject = new BehaviorSubject(0);
```



### ReplaySubject
表示重放，在新的订阅者订阅时重新发送原来的数据，可以通过参数指定重发最后几个数据

```javascript
const subject = new ReplaySubject(2) // 重放最后两个
```



### AsyncSubject
AsyncSubject有点类似 last ,会在 subject 结束后送出最后一个值。



### 多播操作符
原始写法
```javascript
const source$ = interval(1000).pipe(take(3));
const observerA = {
    next: value => console.log('A next: ' + value),
    error: error => console.log('A error: ' + error),
    complete: () => console.log('A complete!')
}
const observerB = {
    next: value => console.log('B next: ' + value),
    error: error => console.log('B error: ' + error),
    complete: () => console.log('B complete!')
}
const subject = new Subject()
subject.subscribe(observerA)
source$.subscribe(subject);
setTimeout(() => {
    subject.subscribe(observerB);
}, 1000);

// "A next: 0"
// "A next: 1"
// "B next: 1"
// "A next: 2"
// "B next: 2"
// "A complete!"
// "B complete!"
```

上面的代码我们用 subject 订阅了 source$, 再让 observerA，observerB订阅 subject。但是这样的写法太复杂。



#### multicast
```typescript
const source$ = interval(1000).pipe(
  take(3),
  multicast(new Subject<number>())
) as ConnectableObservable<number>;

source$.subscribe(observerA); // subject.subscribe(observerA)
const realSubscription = source$.connect(); // source.subscribe(subject)
setTimeout(() => {
    source$.subscribe(observerB); // subject.subscribe(observerB)
  }, 1000);

```
*multicast* 可以用来挂在 subject, 并且返回一个 ConnectableObservable 类型的observable。 <small>可连接类型的 observalbe</small> 

说明：
* 必须等到执行`connect()`之后，才会真的用 *subject* 订阅 *source*，并开始送出元素，如果没有执行该方法，*observable* 不会真正的执行
* 退订的时候，必须退订 *realSubscription* 才是真的退订。



#### refCount
使用 *multicast* 还必须手动 *connect* 比较麻烦。有没有一种可能，自动 *connect*, 自动 *unsubscribe*,于是有了 *refCount*
*refCount* 必须搭配 *multicast* 使用，它可以建立一个只要有订阅就自动 *connect* 的 *observable*。

```typescript
const refCountSource$ = interval(1000).pipe(
  take(3),
  multicast(new Subject<number>()),
  refCount()
);

refCountSource$.subscribe(v => console.log(`refCount A:${v}`)); // subject.subscribe(observerA)
setTimeout(() => {
refCountSource$.subscribe(v => console.log(`refCount B:${v}`));
}, 1000);

```
说明：
* 当订阅数大于0，自动 *connect*, 当订阅数 = 0，自动 *unsubscribe*



#### publish
是`multicast(new Subject<number>())`的简写
```typescript
const source$ = interval(1000).pipe(
  take(3),
  publish(),
  refCount()
);
```

加上 *Subject* 的三种变形
1) `publishBehavior`
使用这个操作符，必须给一个初始值。
```typescript
const source$ = interval(1000).pipe(
  take(3),
  publishBehavior(0),
  refCount()
);
```

2) `publishReplay`
这个操作符代表重放最后几个元素
```typescript
const source$ = interval(1000).pipe(
  take(3),
  publishReplay(2),
  refCount()
);
```

3) `publishLast`
```typescript
const source$ = interval(1000).pipe(
  take(3),
  publishLast(0),
  refCount()
);
```



#### share
*share* 是 `publish(); refCount()`的简写。
```typescript
const source$ = interval(1000).pipe(
  take(3),
  share()
);
```



## 操作符
现在有些操作符不再推荐使用，**而是推荐使用对应的静态方法**。
以 *merge* 举例说来就是：导入操作符的方式变为：`import { merge } from 'rxjs'`, 并且是含义变成了：合并多个 *Observable* ,而不是一个 *Observable* 与其他 *Observable* 合并。



### 合并类操作符
1) `concat`, `merge`
区别是：concat要等上一个Observable对象complate之后再去订阅第二个Observable对象。而merge是同时处理多个Observable对象。

2) `concatAll`, `mgergeAll`, `switchAll`
> 用来将高阶的 Observable 对象压平成一阶的 Observable，和 loadash 中压平数组的 flatten 方法类似.
* *concatAll* 会对内部的 *Observable* 对象做 *concat* 操作。和 *concat* 操作符类似，如果前一个 *Observable* 没有结束，那么 *concatAll* 就不会订阅下一个 *Observable*,
* *mergeAll* 则会同时处理。
* *switchAll* 比较特殊，**喜新厌旧**。如果有新的 *Observable* 那么他就会退订旧的而订阅新的，这也是 'switch' 的含义

3) `concatMap`, `mergeMap`, `switchMap`, `exhaustMap`
1. 高阶 *Observable* 常常是由 *map* 操作符将每个数据映射为 *Observable* 产生，而我们订阅的时候需要将其压平为一阶Observable,就是要先 *map*，然后再使用（2）中的操作符压平。所以rxjs提供了更简洁的API。
2. `Observable ->(map) -> Observable<Observable<T>> ->(mergeAll等) -> ObserVable<T> `
3. 细节：这四个 operator 可以把第一个参数回传的 *promise* 实例 直接转成 *Observable*
```javascript
concatMap = map + concatAll;
mergeMap = map + mergeAll;

// switchMap: 如果有新的就处理新的，并且自动退订旧的
switchMap = map + mergeMap;

// exhuastMap: 先处理进来的第一个值，处理完第一个值之后不一定会处理第二个，而是处理当前最近的那个，依次类推 
exhaustMap = map + exhaust;
```

4) `zip`, `combineLatest`, `withLatestFrom`。
* *zip* 拉链，这个操作符的意思是：数据一定要一一对应。也就是说 source$ 产生一个数据`s1`，然后 data$ 产生一个数据`d1`，zip会把两个数据，组成 `[s1, d1]`。
需要注意的是：数据积压的问题。如果 source$ 产生的速度很快，而 data$产生数据的速度比较慢，那么就会造成 source$ 数据积压，会消耗内存。
* *combineLatest* 组合两个流中最新的数据，一一配对。在两个流都有值的情况下，当一个流有值的时候，就找另外的流的最新的值进行配对。组成 `[s, d]`.
* *withLatestFrom* 没有静态方法。只有操作符方法，并且这时候，数据流不再是平等的了。而是以使用这个操作符的 *Observable* 为主导。当它产生数据的时候，去匹配另外的流的最新的值。

5）`startWith`, `forkJoin`, `race`
*startWith* 给流一个初始值。相当于先甩出一个默认值，然后流正常输出。
*forkJoin* 多个流 *complate* 之后，将多个流的最新值放在数组中，组成`[r1, r2, r3]`。和 *promise.all* 的效果相同。
*race* 使用首先发出值的 *Observable*。和 *promise.race* 的效果相同。这是一个竟态操作符，它会同时订阅它参数内的所有的流，但是只允许第一个产生值的流存在。

6) `pairwise`
作用是：将上一个值和当前值，合并成一个数组，然后发出。
```javascript
// 返回: [0,1], [1,2], [2,3], [3,4], [4,5]
interval(1000)
  .pipe(
    pairwise(),
    take(5)
  )
```



### 缓存
把上游的多个数据缓存起来，当时机合适的时候再把汇集的数据,**以数组的形式**传递给下游。

1）`buffer`, `bufferTime`, `bufferCount`, `bufferWhen`, `bufferToggle`
* *bufferTime* 缓存一定的时间，就把数据传给下游
* *bufferCount* 缓存一定的数量，就把数据传给下游
* *bufferWhen* 接受一个 *closeSelector* 返回一个 Observable, 通过这个这个来控制缓存
```javascript
bufferWhen(() => interval(1000))
```



### 转换
1）`scan`
类似于 ruduce，但是不同的是，*reduce* 只有在所有值都加合完成之后，才会有结果。但是，*scan* 会把每次加合的值传递出去。
```javascript
const source = of(1, 2, 3);
// 基础的 scan 示例，从0开始，随着时间的推移计算总数
const example = source.pipe(scan((acc, curr) => acc + curr, 0));
```

2）`partition`
将一个流，一分为二。满足条件的在左边，不满足条件的在右边。
```javascript
const source = from([1, 2, 3, 4]);
const [evens, odds] = source.partition(v => v % 2 === 0);
```



### 过滤
很多过滤类操作符如 `filter | first` 的断言函数都接受 2-3 个参数！。分别是 `(value, index, source)`。
1) `debounceTime`
`debounceTime(1000)` 代表在1s内，没有新的进来那么就发出这个值，如果有新的进来，那就继续观察它后面1s有没有新的值进来。
极端情况下：你一直不停的输入，那么永远也不会有值发出，因为这个值要待够1s,在这1s的时间内不被别人打扰它才会输出。

2) `throttleTime`
`throttleTime(1000)`,代表在1s内,只能有一个值送出，如果在这1s内还有别的值进来，那么忽略。

3) `auditTime`
`auditTime(1000)`,代表它会忽略流在刚开始的1s内发送的值，1s过后，会发出流的最新值

4）`first`
`first()` 表示第一个元素。`first(predFn)`表示第一个满足条件的元素
方法签名如下：
```javascript
first<T, D>(predicate?: (value: T, index: number, source: Observable<T>) => boolean, defaultValue?: D): OperatorFunction<T, T | D>
```

```javascript
const source = from([1, 2, 3, 4, 5]);
// no arguments, emit first value
const example = source.pipe(first());

// emit first item to pass test
const example = source.pipe(first(num => num === 5));
// output: "First to pass test: 5"

// no value will pass, emit default
const example = source.pipe(first(v => v > 5, 'Nothing'));
// output: 'Nothing'

```



### 工具操作符
1) `timestamp`
```typescript
interface Timestamp<T> {
  value: T
  timestamp: number
}
```
返回包含两个字段的对象：把原来流的信息放在 *value*，附带返回时间戳 *timestamp*

2）`repeat`
使用 repeat 操作符要保证上游的 observable 会终结，不然使用这个操作符没意义。

3) `timeout`
`timeout(2500)` 表示：如果2500ms之内没有收到值的话就直接抛出错误
```javascript
makeRequest(duration).pipe(
  timeout(2500),
  catchError(error=> of(`Request timed out after: ${duration}`))
)
```

3) `timeoutWith`
`timeout(2500, observableInput)` 表示：如果2500ms之内没有收到值的话，就使用第二个参数（observableInput）做为下一步的数据源
```javascript
const requestTimeoutLogger = of('logging request timeout');
fakeRequest(e).pipe(
  timeoutWith(2500, requestTimeoutLogger),
)
```



### 错误处理
1）`catchError`
当 Observale 放生错误的时候，可以使用 `catchError` 来捕获错误
```javascript
const source = throwError('This is an error!');
//gracefully handle error, returning observable with error message
const example = source.pipe(catchError(val => of(`I caught: ${val}`)));
```
> catchError需要返回一个 Observable, 一般我们可以使用 `of(1,2,3)`这种操作
> 这里有个细节: 下面这种，直接返回一个 Iteratorable 的东西，也是可以的
> catchError(err => ['I', 'II', 'III', 'IV', 'V'])




### 函数
1)  `iif`
这个函数，类似于 *R.ifElse*, 不过遗憾的是它不接受参数。
```javascript
const firstOrSecond = iif(
  () => subscribeToFirst,
  of('first'),
  of('second'),
);
```
 
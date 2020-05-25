# RxJS: Reactive Extensions For JavaScript

这也被称为 Functional Reactive Programming，更切确地说是指 Functional Programming 及 Reactive Programming 两个编程思想的结合。
RxJS提供了一套完整的异步解决方案，让我们在面对各种异步行为时，能使用相同的API。
前端中的异步有：事件（event) 、AJSX、动画（animation)、定时器（timer）



## RxJS是什么？
RxJS是一套借由 **Observable sequences** 来组合 **非同步行为** 和 **事件基础** 程序的库
两种模式的结合，**观察者模式**， **迭代器模式**。



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
timer(3000,500).subscribe(console.log);
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



## 操作符
现在有些操作符不再推荐使用，**而是推荐使用对应的静态方法**。
以 *merge* 举例说来就是：导入操作符的方式变为：`import { merge } from 'rxjs'`, 并且是含义变成了：合并多个 *Observable* ,而不是一个 *Observable* 与其他 *Observable* 合并。



### 合并类操作符
1) concat,merge
区别是：concat要等上一个Observable对象complate之后再去订阅第二个Observable对象。而merge是同时处理多个Observable对象。

2) concatAll,mgergeAll,switchAll
用来将高阶的 Observable 对象压平成一阶的 Observable，和 loadash 中压平数组的 flatten 方法类似.
concatAll会对内部的 *Observable* 对象做 *concat* 操作。和 *concat* 操作符类似，如果前一个 *Observable* 没有结束，那么 *concatAll* 就不会订阅下一个 *Observable*,
*mergeAll* 则会同时处理。
*switchAll* 比较特殊，**喜新厌旧**。如果有新的 *Observable* 那么他就会退订旧的而订阅新的，这也是 'switch' 的含义

3) concatMap,mergeMap,switchMap
高阶 *Observable* 常常是由 *map* 操作符将每个数据映射为 *Observable* 产生，而我们订阅的时候需要将其压平为一阶Observable,就是要先 map，然后再使用（2）中的操作符压平。所以rxjs提供了更简洁的API。
```javascript
concatMap = map + concatAll;
mergeMap = map + mergeAll;
switchMap = map + mergeMap;
```

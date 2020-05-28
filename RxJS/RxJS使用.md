# RxJS使用
## 导入方式
```javascript
import { Observable,Subject,asapScheduler,pipe,of,from,interval,merge,fromEvent,SubscriptionLike,PartialObserver } from 'rxjs';
import { map,filter,scan } from 'rxjs/operators' 
import { webSocket } from 'rxjs/webSocket'
import { ajax } from 'rxjs/ajax'
import { TestScheduler } from 'testing'
```



## 约定和说明
**代表流的变量使用 `$` 符号结尾，这是RxJS中的一种惯例**



## rxjs-hooks
两个api,`useObservable`,`useEventCallback`
### useObservable

1) 没有默认值
```javascript
const value = useObservable(() => of(1000))
```

2) 有默认值
```javascript
const value = useObservable(() => of(1000), 20)
```

3) 依赖上一次的状态,工厂函数会传入一个 *state$* 帮你拿到，这里一定需要使用：`withLatestFrom`，不然死循环了。
```javascript
 const value = useObservable((state$) => interval(1000).pipe(
	withLatestFrom(state$),
	map(([index, prevVal]) => index + prevVal),
  ), 0);
```

4）有依赖项数组，类似于`useEffect`
```javascript
 const value = useObservable(
    (inputs$, _state$) => timer(1000).pipe(
      combineLatest(inputs$),
      map(([_, [a, b]]) => a + b),
    ),
    0,
    [a, b],
  );
```

5) 
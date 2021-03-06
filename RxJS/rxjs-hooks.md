# rxjs-hooks
两个api, `useObservable`, `useEventCallback`

## useObservable
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

4) 依赖外部传入的状态，那么就传入第3个参数 这个参数要求是**数组**。这时候工厂函数就会得到两个流，分别是 *state$* 和另一个 *inputs$*
```javascript
 const value = useObservable(
    (state$, inputs$) =>
      combineLatest(timer(1000), inputs$).pipe(map(([_, [a, b]]) => a + b)),
    0,
    [a, b]
  );
```
**总结**：
* *useObservable* 会把值转换成转成 *BehaviorSubject* 挂载在 *useState* 上。
* *useObservable* 会接收 **1-3** 个参数。
  * 第1个参数是工厂函数，接收0-2个参数，返回值是 *Observalbe*。工厂函数第1个参数表示之前的状态流，如果需要用到之前的状态流，那么就传给工厂函数一个*state$* 。第2个参数 *inputs$* 表示外部状态，是个数组。
  * 第2个参数是任意类型，是默认值。*state$* 流的默认值
  * 第3个参数是数组，表示外部的状态。
> ⚠️注意事项：
> * *inputs$* 流发出的值和 *useObservable* 第三个参数的值是对应的。同样是一个数组。在上面的示例中 *input$* 流发出的值总是一个 `[a, b]` 元组。
> * 使用到 *state$* 时候必须搭配 *withLatestFrom* 使用。



## useEventCallback
*useEventCallback* 主要是用来处理交互逻辑
*useEventCallback* 同样会接收 **1-3** 个参数。后面两个参数和 *useObservable* 相同。差异主要在第一个参数。
*useEventCallback* 的第一个参数 *callback* 是 *EventCallback* 类型
```typescript
type EventCallback<EventValue, State, Inputs> = Not<
  Inputs extends void ? true : false,
  (
    eventSource$: Observable<EventValue>,
    state$: Observable<State>,
    inputs$: Observable<RestrictArray<Inputs>>,
  ) => Observable<State>,
  (eventSource$: Observable<EventValue>, state$: Observable<State>) => Observable<State>
>
```
callback的第一个参数是 *event$*
返回值为： 一个 `[callback, value]` 元组



## 代码示例
```javascript
const [handleClick] = useEventCallback(event$ =>
  event$.pipe(
    map(data => ({ ...data, rowData: data.record, visible: true })),
    map(dispatchPayload)
  )
);
```

```javascript
const [onOk] = useEventCallback(
  (event$, state$, input$) =>
    event$.pipe(
      tap(() => setLoading(true)),
      debounceTime(300),
      withLatestFrom(state$, input$),
      exhaustMap(([a, b, [actions]]) => from(actions.submit())),
      map(({ values }) => formateData(values)),
      exhaustMap(saveOuAuth),
      tap(() => {
        handleClose();
        trigger();
        Message.success('保存成功!!!,成功啦啦啦啦啦啦');
        setLoading(false);
      }),
      catchError(() => {
        setLoading(false);
        return EMPTY;
      })
    ),
  undefined,
  [actions]
);
```



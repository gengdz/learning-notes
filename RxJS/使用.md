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
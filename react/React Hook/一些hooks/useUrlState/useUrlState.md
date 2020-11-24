# useUrlState
这个hook是ahook中提供的，在项目中也自己实现了类似作用的hook，看了它的实现之后有一些新的收获
代码摘要如下
```typescript
import { parse, stringify } from 'query-string';
import { useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const location = useLocation();
const history = useHistory();
const queryFromUrl = useMemo(() => {
  return parse(location.search, parseConfig);
}, [location.search]);

const targetQuery = {
  ...initialStateRef.current,
  ...queryFromUrl,
} as state;

const setState = (s: React.SetStateAction<state>) => {
  const newQuery = typeof s === 'function' ? s(targetQuery) : s;
  // 1. 如果 setState 后，search 没变化，就需要 update 来触发一次更新。比如 demo1 直接点击 clear，就需要 update 来触发更新。
  // 2. update 和 history 的更新会合并，不会造成多次更新
  update(v => !v);
  history[navigateMode]({
    hash: location.hash,
    search: stringify({ ...queryFromUrl, ...newQuery }, parseConfig) || '?',
  });
};

return [targetQuery, setState] as const;
```

其中用了 `useLocation | useHistory`。这两个hook中都有search，一直都有使用疑惑，从上面代码中，我们可以看到，它是利用 `location` 来获取 `search`。然后利用 `history`中提供的方法来更新 `search`
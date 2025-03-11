```typescript
const setHideLayoutSearchParams = (
  searchParams: URLSearchParams,
  location:
    | Location
    | Parameters<Parameters<typeof history.listen>[0]>[0]['location'],
) => {
  const params = new URLSearchParams(location.search);

  if (searchParams.get('hideLayout') && !params.has('hideLayout')) {
    params.set('hideLayout', searchParams.get('hideLayout') || '');
    const newPath = `${location.pathname}?${params.toString()}`;
    history.replace(newPath);
  }
};

const [searchParams] = useSearchParams();
const hideLayout = searchParams.get('hideLayout') === 'true';

useEffect(() => {
  const unlisten = history.listen(({ location }) => {
    setHideLayoutSearchParams(searchParams, location);
  });

  // 解决第一次进去时不会触发 listen 的问题
  setHideLayoutSearchParams(searchParams, location);

  return () => {
    unlisten();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

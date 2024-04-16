# react-query

## 是什么？

它是一个**服务端状态管理**库，用来解决异步数据**获取**、**缓存**、**同步**、**更新** 的问题

多个组件请求相同 数据只会发送 1 次请求

自动更新相关请求的状态

```typescript
const queryClient = useQueryClient();

const data = queryClient.getQueryData(['querySubjectAttachments']);

const { mutate: addAppmutate, isPending } = useMutation({
  mutationFn: apiApplicationAdd,
  onSuccess: () => {
    reload();
  },
});

// 新增应用
const handelAdd = async (values: any) => {
  addAppmutate(values);
};
```

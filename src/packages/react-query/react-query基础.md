# react-query

## 是什么？

它是一个**服务端状态管理**库，用来解决异步数据**获取**、**缓存**、**同步**、**更新** 的问题

服务端状态

- 保存在远程，不是你自己拥有或者能控制的位置。
- 需要通过异步的 api 进行获取或者更新
- 共享所有权，其他人可以在你不知情的情况下进行更改
- 你的数据可能会过期

## 为了解决什么问题

- 缓存...（可能是编程中最难做的事情）
- 将同一数据的多个请求合并为单个请求
- 在后台更新“过时”数据
- 了解数据何时“过时”
- 尽快反映数据更新
- 性能优化，例如分页和延迟加载数据
- 管理服务器状态的内存和垃圾收集
- 通过结构共享来记忆查询结果

## 能力盘点

| 能力     | 示例/说明 |
| -------- | --------- |
| 轮询     |           |
| 并行查询 |           |

## 怎么使用？

```typescript
// Access the client
const queryClient = useQueryClient();

// Queries
const query = useQuery({ queryKey: ['todos'], queryFn: getTodos });

// Mutations
const mutation = useMutation({
  mutationFn: postTodo,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

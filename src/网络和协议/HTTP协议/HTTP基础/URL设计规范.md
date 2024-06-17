# URL 设计规范

## 大小写策略

**统一使用小写字母**

**尽量短**

- window 上不区分大小写
- Unix 区分大小写

为了避免问题，统一使用小写字母。

## 命名风格

字母和字母之间统一使用 `-`

## 资源集合 vs 单个资源

使用 / 标识资源层级

```bash
https://github.com/nodejs/node/issues

https://github.com/nodejs/node/issues/52914
```

- 使用 `复数` 表示资源集合
- 使用 `复数/id` 表示单个资源

尽量都是复数 URL 开始

## 路径参数 vs 查询字符串

### 什么时候用路径参数 /

1. 表示资源层级关系。
2. 核心参数。进入某个页面必不可少的参数。

### 什么时候用查询字符串 ?

1. 非层级性的数据。查询字符串适用于搜索过滤、分页、排序等。其中的参数不影响资源的唯一定位，而是用于提供信息或修改视图。举例：`/search?q=keyword&page=2`，这里的 q 和 page 是用于搜索功能的查询参数。

2. 可选参数：如果参数是可选的，不一定出现在每个请求中，或者用户可能想要在浏览器中更改这些参数，那么查询字符串更合适。

如果记录数量很多，服务器不可能都将它们返回给用户。API 应该提供参数，过滤返回结果。

下面是一些常见的参数。

- ?limit=10：指定返回记录的数量
- ?offset=10：指定返回记录的开始位置。
- ?page=2&per_page=100：指定第几页，以及每页的记录数。
- ?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
- ?animal_type_id=1：指定筛选条件
- 参数的设计允许存在冗余，即允许 API 路径和 URL 参数偶尔有重复。比如，GET /zoo/ID/animals 与 GET /animals?zoo_id=ID 的含义是相同的。

## 示例

- GET /zoos：列出所有动物园
- GET /zoos/ID：获取某个指定动物园的信息
- GET /zoos/ID/animals：列出某个指定动物园的所有动物
- GET /zoos/ID/animals/ID：获取某个指定动物园的指定动物

## 资料

- [RESTful API 设计指南-阮一峰](https://www.ruanyifeng.com/blog/2014/05/restful_api.html)

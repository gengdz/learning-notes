# JSDoc 文档

## @param
* 在 ts 中没必要再写一遍类型，也没必要用符号表达可选参数或默认值
* `@param somebody - Somebody's name.` 中的 `-` 体现为缩进

```typescript
/**
 * get请求
 * @param {string} url 接口地址
 * @param {IAnyObj} [params=any{}] - 接口参数，可选  //要想显示 `{}`,前面必需有点东西。。
 * @returns {Promise<R>} 返回 Promise<R>
 */
export const get = <R>(url: string, params: IAnyObj = {}): Promise<R> => {
  return request({
    url,
    params,
  });
};

/**
 * 打招呼
 * @param {string} [somebody] - Somebody's name.
 */
function sayHello(somebody: string = "John Doe") {
  console.log(`hello ${somebody}`)
}
sayHello()
```



## @returns
返回值



## @description
描述作用



## @example
使用示例
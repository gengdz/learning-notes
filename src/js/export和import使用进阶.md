## export进阶用法

### 用法示例

* 采用`export { doCallBack, isEmptyOrNil }`代替 `export const doCallBack... 、 export const isEmptyOrNil`
* 修改导出方法的名字 `export { doCallBack as otherName }`

### 说明

> export命令规定的是对外的==接口==必须与模块内部变量建立一一对应关系
>
> 错误示例：
>
> `export  1` 或者`const a = 1  export a` 




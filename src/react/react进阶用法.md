## 导入说明

```javascript
// 使用的是export const doCallback、或统一暴露 export { doCallback, empty }
import { doCallback, empty } from './common' 


// 这个使用的是export default class AddPicture
import AddPicture from './AddPicture'   
```

## 高阶组件(higherOrderComponent)

1. 什么是高阶组件？

   高阶组件就是，参数是组件，返回值是新组件的**函数**

2. 常用的高阶组件有哪些？

   redux中的connect函数，

3. 
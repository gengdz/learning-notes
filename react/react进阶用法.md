## 导入说明

```javascript
// 使用的是export const doCallback、或统一暴露 export { doCallback, empty }
import { doCallback, empty } from './common' 


// 这个使用的是export default class AddPicture
import AddPicture from './AddPicture'   
```



## 导出

给导出的module起别名 

```javascript
function f1(){}
function f2(){}

export {
  f1 as getFirstName,
  f2 as getSecondName,
}

```





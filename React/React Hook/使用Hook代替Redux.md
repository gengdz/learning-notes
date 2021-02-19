# 使用Hook代替Redux

使用Hook中的  `useContext` 和 `useReducer` 实现代替Redux功能。

## 可行性分析

想要实现Redux，我们必须要做到两点：

* 状态全局化
* 并且能够统一管理

useContext 可以实现状态全局化，useReducer可以实现更新复杂逻辑的状态



## 代码实现

```javascript
// 实现
import React, { useContext, useReducer } from 'react'

export const ApprovalContext = useContext({})

function reducer(state, { type, payload }) {
  switch(type){
    case: 'save': 
      return { ...state, ...payload }
    default:
      return state
  }
}

export function Approval(){
  const [ approval, dispatch ] = useReducer(reducer, {})
  return(
    <ApprovalContext.provider value={{ approval, dispatch }}>
     {props.children}
    </ApprovalContext>
 )
}

```

```javascript
// 使用 0.1 包裹在外层
import React, { useContext } from 'react'
import { ApprovalContext, Approval } from '.models/approval'

function ICApproval() {
  return(
    <Approval>
      <ApprovalResult/>
    </Approval>
  )
}

// 使用 0.2 在子组件中都可以共享这些状态
import React, {useContext} from 'react'
import { ApprovalContext, Approval } from '@/stores/models/approval'

export function ApprovalResult(props) {
  const { approval, dispatch } = useContext(ApprovalContext)
  console.log('approval',approval)
}

```


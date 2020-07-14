# codeReview想法

## import { withRouter } from 'react-router-dom';

### 作用

将一个组件包裹进`Route` 里面，然后`react-router`的 history, location, match 这三个对象就会被放进这个组件的props属性中。

解释一下，如果某个东西不是`Router`, 但是我们要依靠它去跳转一个页面，比如点击页面的 **logo** 返回首页。

### 实现原理：

```javascript
const withRouter = Compontent => () => <Route component={Component}/>
```

### 使用的示例

```javascript
import React from 'react'
import './nav.css'
import {
    NavLink,
    withRouter
} from "react-router-dom"

class Nav extends React.Component{
    handleClick = () => {
        // Route 的 三个对象将会被放进来, 对象里面的方法可以被调用
        console.log(this.props);
    }
    render() {
        return (
            <div className={'nav'}>
                <span className={'logo'} onClick={this.handleClick}>掘土社区</span>
                <li><NavLink to="/" exact>首页</NavLink></li>
                <li><NavLink to="/activities">动态</NavLink></li>
                <li><NavLink to="/topic">话题</NavLink></li>
                <li><NavLink to="/login">登录</NavLink></li>
            </div>
        );
    }
}

// 导出的是 withRouter(Nav) 函数执行
export default withRouter(Nav)
```

说明：将`span`使用`withRouter`作为一个可点击跳转的`Link`
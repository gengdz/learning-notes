# ReactRouter 基础

React 是单页面应用。也就是只有一个页面，它是没有路由导航机制的，我们需要这种路由机制，以便在不同的视图之间切换而不用刷新整个页面。所以就有了 ReactRouter

## 路由和前端路由

- 路由是根据不同的 URL 地址展示不同的内容或页面
- 前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是服务端根据不同的 URL，返回不同的页面。

## 实现原理

两种模式：

1. Hash 模式
2. HTML5 history 模式

### Hash 模式

URL hash 就是如下

```html
https://segmentfault.com/a/1190000011956628#articleHeader2
```

这种 `#`。后面 hash 值的变化，并不会导致浏览器向服务器发出请求，浏览器不发出请求，也就不会刷新页面。另外每次 hash 值的变化，还会触发 `hashchange` 这个事件，通过这个事件我们就可以知道 hash 值发生了哪些变化。

通过 location.hash 、hashChange 来保持 UI 同 URL 一致

### HTML history 模式

14 年后，因为 HTML5 标准发布。多了两个 API，`pushState` 和 `replaceState`，通过这两个 API 可以改变 URL 地址，页面不会刷新，不会发送请求。同时还有 `onpopstate` 事件。通过这些就能用另一种方式来实现前端路由了，但原理都是跟 hash 实现相同的。用了 HTML5 的实现，单页路由的 URL 就不会多出一个 `#`，变得更加美观。但因为没有 `#` 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

通过 HTML5 history API （pushState、replaceState、popstate）机制来维持页面 UI 同 URL 的统一

history.pushState 可以修改 URL，页面不会刷新，浏览器会将新的状态和 URL 添加到历史记录栈中。

```typescript
history.pushState(state, title, url);
```

history.replaceState 类似于 history.pushState 方法，用于修改浏览器的历史记录栈并改变当前 URL。与 pushState 不同的是，replaceState 替换当前的历史记录项而不是添加新的记录。

```typescript
history.replaceState(state, title, url);
```

当用户通过浏览器的前进或后退按钮导航时，popstate 事件将被触发，

> [前端路由 Hash 与 History 模式](https://segmentfault.com/a/1190000020888923)

## Router

总的容器组件，负责数据的提供。

- 提供 `history` 和 `location`
- 监听和取消监听 `history`，更新 `location`

```typescript
useEffect(() => {
  const unListen = history.listen(({ location: loc }) => {
    setLocation(loc as any);
  });
  return unListen;
}, [history]);

return {
  history,
  location,
};
```

## Switch

Route 的容器组件。负责只匹配一个路由，匹配到就直接返回，防止同时有多个匹配到

```typescript
for (let child of childrens) {
  if (location.pathname.match(child?.props?.path)) {
    return child;
  }
}
```

## Route

如果给定的 path 和当前 location.pathName 匹配就显示，否则不显示

```typescript
if (location.pathname.match(path)) {
  return React.createElement(component);
}
```

## Link

进行路由跳转。

## OutLet

OutLet 组件用于渲染匹配的子路由组件。它充当一个占位符，react router 会在这个位置渲染当前匹配的子组件。这意味这不需要在父组件中显式的指定要渲染的子组件，而是让路由配置决定哪个子组件应该被渲染。

Outlet 组件主要解决了路由嵌套和组件组织的问题，让你可以在应用中构建更为复杂的页面层级结构。使得路由配置更加集中和清晰，减少了重复的代码和组件的硬编码，从而简化了嵌套路由的开发流程。

它和 children 的联系和区别？

1. 当路由较为复杂，子路由需要根据多个层级动态决定时，使用 <Outlet> 可以更好地管理这种复杂性。
2. 不利于页面分享和 URL 地址管理

性能优势：

- 代码分割：如果你的应用结构利于代码分割，使用 <Outlet> 与 React Router 的懒加载(React.lazy)和动态导入(import())结合起来，可以在组件级别进行懒加载。这样可以将代码拆分成小的 chunks，在需要时才加载相应的组件代码。这可以减少初始加载时间，提高性能。

- 渲染优化：<Outlet> 通常用在路由配置中，React Router 会负责确定何时渲染组件。只有当路由匹配时，对应的组件才会被挂载和渲染，未匹配的组件不会被加载，可以优化性能。

使用 children 可能会意外渲染不必要的组件或导致不必要的重渲染，从而影响性能。

```typescript

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="messages" element={<DashboardMessages />} />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>
    </Routes>
  );
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* This element will render either <DashboardMessages> when the URL is
          "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
      */}
      <Outlet contenxt={{ name: 'xingya' }}/>
    </div>
  );
}

function DashboardMessages() {
 const { name } = useOutletContext();

  return (
    <div>
      <h2>DashboardMessages</h1>
    </div>
  );
}

```

父路由向子路由传递参数

- 可以使用 OutLet 的 context 属性传递参数，然后在 useOutletContext 中获取参数
- 也可以使用 React 的 context, useContext 来接受参数。

[OutLet](https://reactrouter.com/en/main/components/outlet)

如果没有 OutLet，需要怎么实现上面的功能

在 V5 中，这么实现

```tsx
function App() {
  return (
    <Router>
      <Switch>
        {/* 使用 render prop 来嵌入 Dashboard 以及其子路由 */}
        <Route path="/" render={() => <Dashboard />}></Route>
      </Switch>
    </Router>
  );
}

function Dashboard() {
  // useRouteMatch 钩子可以帮助我们得到当前匹配路由的信息
  let { path, url } = useRouteMatch();

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link to={`${url}/messages`}>Messages</Link>
        </li>
        <li>
          <Link to={`${url}/tasks`}>Tasks</Link>
        </li>
      </ul>

      {/* 在 Dashboard 中定义子路由 */}
      <Switch>
        <Route path={`${path}/messages`}>
          <DashboardMessages />
        </Route>
        <Route path={`${path}/tasks`}>
          <DashboardTasks />
        </Route>
      </Switch>
    </div>
  );
}
```

不使用 router 相关的 api

```tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

// 定义 App 组件
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

// 定义 Dashboard 组件
function Dashboard() {
  const location = useLocation();
  const name = 'xingya';

  // 使用 useMemo 来避免不必要的重新渲染
  const currentComponent = useMemo(() => {
    const pathname = location.pathname;
    switch (pathname) {
      case '/messages':
        return <DashboardMessages name={name} />;
      case '/tasks':
        return <DashboardTasks name={name} />;
      default:
        return null;
    }
  }, [location.pathname, name]);

  return (
    <div>
      <h1>Dashboard</h1>
      {currentComponent}
    </div>
  );
}

// 定义 DashboardMessages 组件
function DashboardMessages({ name }) {
  return (
    <div>
      <h2>Messages for {name}</h2>
    </div>
  );
}
```

## withRouter

### 作用

把不是通过路由切换过来的组件，将 `react-router` 的 history, location, match 这三个对象就会被放进这个组件的 props 属性中。

默认情况下必须经过路由匹配的组件才拥有路由参数。然而并不是所有的组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用 withRouter 就可以给此组件传入路由参数了。

### 实现原理：

```javascript
const withRouter = (Compontent) => () => <Route component={Component} />;
```

### 使用的示例

```javascript
import React from 'react';
import './nav.css';
import { NavLink, withRouter } from 'react-router-dom';

class Nav extends React.Component {
  handleClick = () => {
    // Route 的 三个对象将会被放进来，对象里面的方法可以被调用
    console.log(this.props);
  };
  render() {
    return (
      <div className={'nav'}>
        <span className={'logo'} onClick={this.handleClick}>
          掘土社区
        </span>
        <li>
          <NavLink to="/" exact>
            首页
          </NavLink>
        </li>
        <li>
          <NavLink to="/activities">动态</NavLink>
        </li>
        <li>
          <NavLink to="/topic">话题</NavLink>
        </li>
        <li>
          <NavLink to="/login">登录</NavLink>
        </li>
      </div>
    );
  }
}

// 导出的是 withRouter(Nav) 函数执行
export default withRouter(Nav);
```

说明：将`span`使用`withRouter`作为一个可点击跳转的`Link`

## 问题

1. `react-router` 和 `react-router-dom` 的联系和区别？

   `react-router` 实现了核心功能，是个 core 包，不仅可以在 WEB 中使用，也可以在 native 应用中使用。

   `react-router-dom` 基于 `react-router`。用于 WEB 环境的前端路由，加入了在**浏览器运行环境**下的一些功能。比如 Link 组件、BrowserRouter 和 HashRouter 组件等。

2. react-router 里的「 `<Link>` 标签」和 「 `<a>` 标签」有什么区别？

   `<Link>` 标签本质也是 `<a>` 标签。只不过 点击 Link 标签的时候，会阻止 a 标签的默认行为（这样点击完就不会跳转和刷新了）。然后取出 href。使用 history 的方式进行跳转。这样就不会刷新页面了。

### 下面这段代码会在 pathname 变化的时候执行吗

```typescript
useEffect(() => {
  const a = window.location.pathname;
  console.log('xxx', a);
}, [window.location.pathname]);
```

不会。

这里写了 window.location.pathname 其实和没写是一样的效果。因为 useEffect 的依赖项应该是 state 和 props。

只有渲染了才有机会说 useEffect 会不会执行。React 更新就两个：state 变化、props 变化

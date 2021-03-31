# BOM 基础
英文：Browser Object Model
中文 浏览器对象模型

是对浏览器提供的 API 的统称

BOM 提供的 API 都放在了 window 全局对象中，它代表当前浏览器窗口，DOM 也属于 BOM 的一部分，因为 window 也包括 document 对象

## 常见的 API 有哪些？
1. doucument

2. 弹窗
    * alert
    * prompt
    
3. 窗口属性
    
    * innerWidth
    * innerHeigh
    * open
    * close
    
4. location 属性

    用于 URL 相关的操作。

    | 属性                | 作用                                  |
    | ------------------- | ------------------------------------- |
    | `location.href`     | 获取当前页面的 url 或者跳转到新的 url |
    | `location.hostname` | 获取 url 中主机部分                   |
    | `location.pathname` | 获取 url 中路径部分                   |
    | `location.reload()` | 刷新当前页面                          |

5. Histroy 属性

    | 属性                                   | 作用     |
    | -------------------------------------- | -------- |
    | `history.back()`                       | 后退 <-  |
    | `history.forward()`                    | 前进 ->  |
    | `history.go()`                         | 任意跳转 |
    | `history.pushState(data,title,url)`    | 手动添加 |
    | `history.replaceState(data,title,url)` | 手动替换 |

6. Navigator 属性

    用户浏览器相关的信息

    | 属性                                                    | 作用         |
    | ------------------------------------------------------- | ------------ |
    | `navigator.userAgent`                                   |              |
    | `navigator.geolocation.getCurrentPosition(console.log)` | 设备地理位置 |
    |                                                         |              |

7. Screen 属性

    用户屏幕相关的信息

    | 属性            | 作用     |
    | --------------- | -------- |
    | `screen.width`  | 屏幕宽度 |
    | `screen.height` | 屏幕高度 |
    |                 |          |


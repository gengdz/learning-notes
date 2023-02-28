# npm link 

作用：用来本地开发和测试需要发布的 npm 包。好处是：不用发布到 npm 服务器就可以在其他项目中使用。

原理：为开发的模块(待发布的 npm 包)创造一个全局链接，在主项目里链接这个依赖的模块，进行测试。


## 使用步骤
目标：**在 main 项目中，使用 myAxios 项目**。


建立连接
1. 在 module 项目中使用 `npm link`；
    * 复制 package.json 文件中 的 name 字段：`"name": "@feature/myAxios"`
2. 在 main 项目中使用 `npm link @feature/myAxios` 链接 
3. 在 main 项目中通过 `import axios from '@feature/myAxios'` 或者 使用 `const axios = require("@feature/myAxios")`

如果到了这一步报错为：`Failed to compile with 1 errors: the dependency was not fond`，说明：在 `@feature/myAxios` 中没有生成可以被使用的文件。通过下面的方式解决：
1. 对 `@feature/myAxios` 进行编译。 使用类似 `npm run compile` 的方式，对项目进行编译。
2. 再次在 main 项目中使用 `npm link @feature/myAxios` 链接。
得到了这一步已经不报错了，可以开心的使用 `npm link` 了。

如果你使用上面的方式，会发现在使用的过程中，遇到了一个问题：就是如果你对 `@feature/myAxios` 进行了修改，那么必须进行一次编译才能使改动在 main 项目中生效，怎么解决？
1. 修改项目的入口文件。具体操作为：修改 `package.json` 文件中的入口文件 **main** 为非编译后的文件，通常为 `src/index.ts`。
2. 再次在 main 项目中使用 `npm link @feature/myAxios` 链接。
这次就可以随时修改，随时生效了。

到了这一步，如果你改了 **main** 之后，依然没有生效，头疼！如何解决？
1. 查看 `package.json` 文件中是否有 `browser`。如果有，修改 **browser** 为非编译后的文件，通常为：`src/index.ts`
2. 再次在 main 项目中使用 `npm link @feature/myAxios` 链接。
这次就可以随时修改，随时生效了。
原理是：如果有 **browser**，那么它的优先级会高于 **main**。所以需要修改 **browser**。



去除连接
1. 在 main 项目中，使用 `npm unlink @feature/myAxios`
2. 在 myAxios 项目中，使用 `npm unlink`



## 全局链接
查看创建的全局链接名称
// TODO 这个用法有待验证
`npm ls --global --depth 0`

强制删除某个全局链接
`sudo npm rm --global packageName`




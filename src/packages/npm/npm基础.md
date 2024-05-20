# npm 基础

## npm 是什么？

它是 `Node Package Manager` 的简称。

## 包升级策略

- ^1.2.3 >= 1.2.3 < 2.0.0
- ^0.2.3 >= 0.2.3 < 0.3.0
- ^0.0.3 >= 0.0.3 < 0.0.4

---

- ^0.x >= 0.0.0 < 1.0.0
- ^1.x >= 1.0.0 < 2.0.0

---

- ^1.2.x >= 1.2.0 < 2.0.0
- ^0.0.x >= 0.0.0 < 0.1.0
- ^0.0 >= 0.0.0 <0.1.0

---

- ~1.2.3 >= 1.2.3 < 1.3.0
- ~1.2 >= 1.2.0 < 1.3.0（same as 1.2.x)
- ~1 >= 1.0.0 <= 2.0.0（same as 1.x）
- ~0.2.3 >= 0.2.3 < 0.3.0
- ~0.2 >= 0.2.0 < 0.3.0 (same as 0.2.x)

## 一些命令

### 安装包

| 命令                          | 作用                          |
| ----------------------------- | ----------------------------- |
| `npm install -S react lodash` | 安装 npm 包到 dependencies    |
| `npm install -D react lodash` | 安装 npm 包到 devDependencies |
| `npm install -D react@beta`   | 安装 beta 版本的包            |

### 删除包

| 命令                   | 作用        |
| ---------------------- | ----------- |
| `npm uninstall lodash` | 删除 lodash |

### 升级包

| 命令                        | 作用                   |
| --------------------------- | ---------------------- |
| `npm update`                | 升级所有包             |
| `npm update lodash`         | 升级 lodash 到最新版本 |
| `npm update lodash@4.17.20` | 升级到指定版本         |

### 查看包

| 命令                          | 作用                          |
| ----------------------------- | ----------------------------- |
| `npm view axios versions`     | 查看 axios 所有可用版本       |
| `npm view axios dependencies` | 查看 axios 的依赖依赖了哪些包 |

### 查看包详情

| 命令                     | 作用                      |
| ------------------------ | ------------------------- |
| `npm docs axios`         | 打开 axios 的文档         |
| `npm ls [--depth=1]`     | 列出项目中安装的包        |
| `npm ls axios --depth=0` | 项目顶层依赖的 axios 版本 |
| `npm ls [-g]`            | 查看全局安装的包          |
| `npm outdated`           | 查看过期的包              |

### npm owner

| 命令                                  | 作用           |
| ------------------------------------- | -------------- |
| `npm owner add <user> <package name>` | 增加一个维护者 |
| `npm owner rm <user> <package name>`  | 删除一个维护者 |
| `npm owner ls  <package name>`        | 列出所有维护者 |

### npm version

| 命令                | 作用               |
| ------------------- | ------------------ |
| `npm version patch` | 修改 z 位          |
| `npm version minor` | 修改 y 位          |
| `npm version major` | 修改 x 位          |
| `npm version x.y.x` | 修改版本号为 x.y.z |

### npm config

| 命令                 | 作用           |
| -------------------- | -------------- |
| `npm config list`    | 列出配置       |
| `npm config get/set` | 获取和设置配置 |

- prefix 设置全局安装的包的目录
- registry 设置注册表的地址。从哪个注册表获取包。

```bash
# prefix 设置全局安装的包的目录
npm config set prefix="/Users/xingya/.npm-global"

# registry 设置注册表的地址。从哪个注册表获取包。
npm config set registry="https://my-private-registry.com"
```

### npm publish

发布包到 npm 公共注册表上。

| 命令                      | 作用               |
| ------------------------- | ------------------ |
| `npm publish --tage beta` | 发布 beta 版本的包 |

### npm help [command]

获取某个命令的帮助信息

### npm login

登录

### npm whoami

获取登录信息

### npm pkg

管理 package.json。

| 命令                        | 作用                   |
| --------------------------- | ---------------------- |
| `npm pkg set <key>=<value>` | 设置 package.json 字段 |
| `npm pkg get <key>`         | 获取 package.json 字段 |
| `npm pkg delete key`        | 删除 package.json 字段 |

### npm exec

在项目的范围内执行 shell 命令。`node_modules/.bin` 里面的命令都可以使用

它可以使用全局安装和项目级别安装的依赖的命令。

```bash
npm exec jest
```

还有一个用途：如果项目是 monorepo，每个子模块都有自己的 package.json 文件和 scripts 字段定义了一些特定的命令。如果你想在根目录中一次性运行所有子模块的特定命令，而不需要进入每个子模块执行相同的命令。

### npx

是 npm 的一个内置命令，它允许你不在项目安装的情况下 运行一个本地或者远程 npm 包的命令使用 npx 可以在不全局安装包的情况下直接运行他们的命令。

| 命令                          | 作用                                                          |
| ----------------------------- | ------------------------------------------------------------- |
| `npx webpack-dev-server`      | 在当前项目查找并运行 webpack-dev-server，启动项目的开发服务器 |
| `npx create-react-app my-app` | 使用 create-react-app 创建一个名为 my-app 的 react 项目       |

npm create vite = npx create-vite 只有 create-xx 包，才能使用这个命令 npx = npm exec

`npx --no -- commitlint --edit ${1}`

- --no 是 npx 的一个 option，禁止在本地执行时自动安装缺少的包。
- -- 将后面的内容视为命令的参数，而不是 npx 的 option
- commitlint --edit ${1} 执行 commitlint --edit 允许编辑提交消息， ${1} 是占位符，用来替换你实际在 shell 写的消息内容。

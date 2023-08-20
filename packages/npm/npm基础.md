# npm 基础

## npm 是什么？

它是 `Node Package Manager` 的简称。

## 一些命令

| 命令                          | 作用                           |
| ----------------------------- | ------------------------------ |
| `npm install -S react lodash` | 安装 npm 包到 dependencies     |
| `npm install -D react lodash` | 安装 npm 包到 devDependencies  |
| `npm update`                  | 升级所有包                     |
| `npm update lodash`           | 升级 lodash 到最新版本         |
| `npm update lodash@4.17.20`   | 升级到指定版本                 |
| `npm uninstall lodash`        | 删除 lodash                    |
| `npm ls`                      | 列出项目中用到的包和其依赖关系 |
| `npm ls axios`                | 查看 axios 的依赖关系          |
| `npm view axios dependencies` | 查看 axios 的依赖依赖了哪些包  |

### 查看包

| 命令                          | 作用                          |
| ----------------------------- | ----------------------------- |
| `npm view axios versions`     | 查看 axios 所有可用版本       |
| `npm view axios dependencies` | 查看 axios 的依赖依赖了哪些包 |

### 安装包

| 命令                          | 作用                          |
| ----------------------------- | ----------------------------- |
| `npm install -S react lodash` | 安装 npm 包到 dependencies    |
| `npm install -D react lodash` | 安装 npm 包到 devDependencies |

### 升级包

| 命令                        | 作用                   |
| --------------------------- | ---------------------- |
| `npm update`                | 升级所有包             |
| `npm update lodash`         | 升级 lodash 到最新版本 |
| `npm update lodash@4.17.20` | 升级到指定版本         |

### 删除包

| 命令                   | 作用        |
| ---------------------- | ----------- |
| `npm uninstall lodash` | 删除 lodash |


### 查看包详情
| 命令                          | 作用                           |
| ----------------------------- | ------------------------------ |
| `npm docs axios`                  | 升级所有包                     |
| `npm update lodash`           | 升级 lodash 到最新版本         |
| `npm update lodash@4.17.20`   | 升级到指定版本                 |
| `npm uninstall lodash`        | 删除 lodash                    |
| `npm ls`                      | 列出项目中用到的包和其依赖关系 |
| `npm ls axios`                | 查看 axios 的依赖关系          |
| `npm view axios dependencies` | 查看 axios 的依赖依赖了哪些包  |

## 包升级策略

- ^1.2.3 >= 1.2.3 < 2.0.0
- ^0.2.3 >= 0.2.3 < 0.3.0
- ^0.0.3 >= 0.0.3 < 0.0.4
  <br/>

- ^0.x >= 0.0.0 < 1.0.0
- ^1.x >= 1.0.0 < 2.0.0
  <br/>

- ^1.2.x >= 1.2.0 < 2.0.0
- ^0.0.x >= 0.0.0 < 0.1.0
- ^0.0 >= 0.0.0 <0.1.0

---

- ~1.2.3 >= 1.2.3 < 1.3.0
- ~1.2 >= 1.2.0 < 1.3.0（same as 1.2.x)
- ~1 >= 1.0.0 <= 2.0.0（same as 1.x）
- ~0.2.3 >= 0.2.3 < 0.3.0
- ~0.2 >= 0.2.0 < 0.3.0 (same as 0.2.x)

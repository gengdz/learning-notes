# homebrew

## 是什么？

是一个 Mac 中包管理工具。

## 做什么？

可以下载 appStore 中没有或者有的软件等，可以对包进行下载，更新，删除。

## 一些命令

| 命令                 | 作用                               |
| -------------------- | ---------------------------------- |
| brew help            | 很多命令                           |
| brew list            | 查看所有已经安装的包信息           |
| brew install         | 安装包                             |
| brew uninstall       | 卸载包                             |
| brew outdated        | 查看哪些包需要更新                 |
| brew update          | 更新自己                           |
| brew upgrade（包名） | 升级所有的包（指定的包）           |
| brew info（包名）    | 查看包信息（指定的包）             |
| brew tap user/tap    | 添加一个名为 user/tap 的第三方仓库 |

## 一些核心概念

### Formula

定义：在 Homebrew 中，一个 formula 是一个 Ruby 脚本，描述了如何安装一个软件包。它包括软件的 URL、任何依赖、安装过程的配置选项、使用的编译参数等。

作用：Formula 是 Homebrew 安装软件的基础。当你通过 brew install <formula> 命令安装软件时，Homebrew 会查看这个 formula 并按照其指示执行。

### Bottle

定义：一个 bottle 是一个预编译的二进制包，即已经为特定的操作系统版本编译好的软件包，通常存储在 Homebrew 的 bintray 存储库中或者是 GitHub 的 Release 页面上。

作用：Bottle 允许用户在不经过编译的情况下安装软件，大幅缩短安装时间。当你执行安装命令时，如果 Homebrew 发现有对应的 bottle，就会直接下载这个预编译版本而不是从源代码开始构建。

### Cask

定义：Cask 是 Homebrew 的一个扩展，它允许 Homebrew 管理 macOS 原生的 GUI 应用程序，这些 GUI 应用程序通常是通过打包好的 .app 文件发布的，而不是通过源代码构建。

作用：通过 Homebrew Cask，你可以使用与安装 CLI 工具相同的方式来安装 GUI 应用程序。用户可以通过类似 brew install --cask <cask> 的命令安装 macOS 的 应用程序，如 Google Chrome、Visual Studio Code 等。

### Tap

定义："tap" 是一个第三方的 Homebrew 仓库，通过这个命令可以让用户安装非官方的 formula 和 casks。

作用：允许扩展 Homebrew 的软件目录，包括私有或用户维护的仓库。

本意是：轻打、轻拍；利用；水龙头；

brew tap 命令来“接入”（或“轻拍开启”）更多的第三方仓库，从而能够安装那些不在默认仓库中的软件包。和 scoop 中 buckets 的概念是一样的。

### 黑话

你是更愿意看到这样的鬼话：

> Homebrew 首先阅读配方（formula），如果有中意的瓶装版（bottle），就直接存入酒窖（cellar）里的加压桶（keg），然后倒（pour）给顾客。也可以从木桶（cask）里直接倒酒，或者从别人的酒头（tap）里打酒。

还是这样的人话：

> Homebrew 首先读取软件包定义文件，如果有适用的预编译二进制文件，就下载到统一安装路径下以名称和版本命名的子目录，然后在 bin 目录中为其创建符号链接。也支持安装 macOS 原生应用，以及添加第三方软件仓库。

## 安装的包

### tree

安装 `brew install tree`。需要注意的是中文乱码，可以通过 `tree -N` 的方式解决。

| 命令      | 作用       |
| --------- | ---------- |
| tree -L 2 | 只显示两层 |

## 使用场景

Q：使用 `brew outdated` 但是没有拉到需要的包，是为什么？A：因为 brew 本身的版本太低了。需要更新 brew 自身的版本。

Q: 使用 `brew update` 更新 brew 时，没有反应？怎么处理 A: 可以先使用 `brew update-reset`，然后再 `brew update`

## options

### `--repo[tap ...]`

展示 brew 的 git 仓库地址

```bash
brew --repo homebrew/cask
```

### `--adopt`

手动安装了软件，现在想通过 Homebrew 来管理

```bash
brew install chrome --adopt
```

## 换源

2023.2/16 日发布 4.0，抛弃了使用 Git 的方式维护软件信息而采用 JSON 文件的方式。目的是改善更新操作的速度。

不再需要 brew/core 和 brew/cask 仓库，在执行命令的时候会提示清理

```bash
brew untap homebrew/cask
brew untap homebrew/core
```

现在替换源应该使用下面这种方式

```bash
# 清华大学源
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
```

相关链接

- [Homebrew 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)
- [Homebrew 升级 4.0.0，麦金塔上的啤酒会更香吗？](https://sspai.com/post/78587)

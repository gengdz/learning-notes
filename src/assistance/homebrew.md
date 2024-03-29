# homebrew

## 是什么？

是一个 Mac 中包管理工具。

## 做什么？

可以下载 appStore 中没有或者有的软件等，可以对包进行下载，更新，删除。

## 一些命令

| 命令                 | 作用                     |
| -------------------- | ------------------------ |
| brew help            | 很多命令                 |
| brew list            | 查看所有已经安装的包信息 |
| brew install         | 安装包                   |
| brew uninstall       | 卸载包                   |
| brew update          | 更新自己                 |
| brew outdated        | 查看哪些包需要更新       |
| brew upgrade（包名） | 更新所有的包（指定的包） |
| brew info（包名）    | 查看包信息（指定的包）   |

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

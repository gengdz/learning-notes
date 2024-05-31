# Tmux

## Tmux 的几个概念

一个 session 下面可以有几个 window，一个 window 可以分割几个 pane。

- `C-b ?` 可以查看所有帮助信息
- `C-b :` 可以使用所有命令。比如：`<C-b>: new -s code`

### session

C-b s：列出所有会话。

#### 接入会话

```bash
# 使用会话名称
tmux attach -t <session-name>
```

#### 分离对话

- `C-b d`

```bash
tmux detach
```

#### 新建会话

```bash
tmux new -s sessionName
```

#### 杀死会话

```bash
# 使用会话名称
tmux kill-session -t <session-name>
```

#### 切换会话

- `C-b (` Switch to previous client
- `C-b )` Switch to next client

```bash
tmux switch -t sessionName
```

#### 重命名会话

- `C-b $`

```bash
tmux rename-session -t 0 <new-name>
```

#### 快捷键补充

- `C-b s` 列出所有会话

### window

#### 新建 window

- `C-b c`

```bash
tmux new-window -n windowName
```

#### window 重命名

- `C-b ,`

```bash
tmux rename-window newName
```

#### 切换窗口

- `<P-p/n>` 前一个后一个

```bash
tmux select-window -t name
```

#### 杀死窗口

- `<P-&>`

#### 移动，交换窗口的位置

- `<P-.>`

```bash
# 比如我目前在 buffett 窗口，我想让这个窗口和 `note` 窗口交换位置
tmux swap-window -t note
```

### pane

#### 新增窗格

- `<P-%>` 竖直分屏
- `<P-">` 水平分屏

#### 杀死窗格

- `<P-x>` 关闭窗格

### 窗格大小

- `<P-z>` 最大化窗格

### 移动窗格

`<P-h/l/j/k>`

### 交换窗格

`<C-b {}>`

## 一些快捷键或者命令行

- 翻屏模式 `<P-[`。然后使用 _方向键_ 或者使用 _pageUp, pageDown_ 进行翻屏
- 退出翻屏模式 `q`
- 所有 Tmux 命令：`tmux list-commands`

## Tmux 美化

通过 `code .tmux.conf` 设置。需要注意的是如果是直接写在文件中，那么不需要有前面的 `tmux`

```bash
# 设置对齐方式
tmux set-option -g status-justify centre

# 设置背景样式
tmux set -g status-bg '#477b79'

# 设置左边栏的宽度
tmux set -g status-left-length 100

# 设置右边栏的样式
tmux set -g status-right '#[fg=white,bg=default,bright]%H:%M:%S #[fg='#bdc3c7']%Y-%m-%d %a'

```

## Tmux Floating Popup

弹出窗口

`tmux popup`

| option | 说明                           |
| ------ | ------------------------------ |
| -d     | directory 指定工作目录         |
| -E zsh | 当这个命令退出的时候关闭 popup |

直接在命令行中打开可以使用

```bash
tmux popup -d "$PWD" -E
```

可以在配置中定义快捷键

```bash
# 打开浮动终端
bind p popup -d "#{pane_current_path}" -w "80%" -h "80%"  -E
```

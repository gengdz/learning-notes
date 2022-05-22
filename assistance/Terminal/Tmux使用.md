# Tmux
## Tmux 的几个概念

一个 session 下面可以有几个 window，一个 window 可以分割几个 pane。



### session
Ctrl+b s：列出所有会话。
Ctrl+b $：重命名当前会话。

#### 接入会话

```bash
# 使用会话名称
tmux attach -t <session-name>
```



#### 分离对话

快捷键 `Ctrl+b d`
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



#### 切换对话
```bash
tmux switch -t sessionName
```



### window
一、新建 window
```bash
tmux new-window -n windowName
```

二、window 重命名
```bash
tmux rename-window newName
```

三、交换窗口的位置
```bash
# 比如我目前在 buffett 窗口，我想让这个窗口和 `note` 窗口交换位置
tmux swap-window -t note
```


切换窗口 
```bash
tmux select-window -t name
```


## 一些快捷键或者命令行
* 翻屏模式 `ctrl + b + [`。然后使用 *方向键* 或者使用 *pageUp, pageDown* 进行翻屏
* 退出翻屏模式 `q`
* 切换窗口 `ctrl + b + p/n`
* 最大化窗格：`ctrl + b + z`。
* 所有 Tmux 命令：`tmux list-commands`



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

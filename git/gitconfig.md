# gitconfig配置
主要是配置一个命令简写。



## 查看和配置命令
* `git config --global(local) —-list`   查看全局或者是本地配置
* `git config --global(local) user(alias).email  1583751445@qq.com`


## 配置方式

### git的全局配置
配置文件的位置在 `C:\Users\dezhougeng.gitconfig` 文件中，设置的方式有两种:
* 通过 `code .gitconfig` 打开配置界面，然后设置
* 通过命令直接设置 `git config --global alias.s   status`

目前使用的配置如下：
```javascript
[alias]
  a = add .
  c = commit
  s = status
  l = log
  b = branch
```



### 系统配置
window下 配置文件在`C:\Users\dezhougeng\.bash_profile` 文件中。打开方式为 `code .bash_profile`；mac下配置文件在 `~/.zshrc`，打开方式为 `code .zshrc`

```javascript
alias gs="git status"
alias gc="git commit -m "
alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit  "
alias gb="git branch"
alias ga="git add ."
alias go="git checkout"
```



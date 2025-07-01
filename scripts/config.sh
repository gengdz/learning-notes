#!/bin/zsh

# 映射关系
typeset -A links=(
    # 源文件路径source        目标链接路径target
    "$HOME/.config/.zshrc"           "$HOME/.zshrc"
    "$HOME/.config/.gitconfig"       "$HOME/.gitconfig"
    "$HOME/.config/.global-gitignore" "$HOME/.gitignore"
)

for source in "${(@k)links}"; do
    target=${links[$source]}
    if [ -f $target ]; then
        echo "文件已存在: $target，[跳过]"
    else
        ln -s $source $target && echo "已创建: $source → $target"
    fi
done




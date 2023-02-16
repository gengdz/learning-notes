# 使用 lazy.nvim 配置 Neovim

## autocmds
使用下面的方式，关闭拼写检查
```lua
-- 不需要拼写检查
vim.api.nvim_create_autocmd("FileType", {
  pattern = { "gitcommit", "markdown" },
  callback = function()
    vim.opt_local.wrap = false
    vim.opt_local.spell = false
    vim.wo.conceallevel = 0
  end,
})


-- 取消换行注释
-- 用o换行不要延续注释
vim.api.nvim_create_autocmd({ "BufEnter" }, {
  pattern = { "*" },
  callback = function()
    -- vim.opt.formatoptions = vim.opt.formatoptions - { "c", "r", "o" }
    vim.opt.formatoptions = vim.opt.formatoptions
      - "o" -- O and o, don't continue comments
      + "r" -- But do continue when pressing enter.
  end,
})
```

## 自动切换输入法
1. 安装插件
```lua
  { "brglng/vim-im-select" },

```
2. 设置
```lua
-- 自动切换输入法
vim.g.im_select_get_im_cmd = "['im-select']"
vim.g.im_select_default = "com.apple.keylayout.ABC"

```



## 插件的禁用

```lua
  { "ggandor/flit.nvim", enabled = false },

```
## LSP 快捷键的禁用
LSP 快捷键 的禁用必须要使用 init 函数。同时如果 mode 不是 normal，那么要显式写明 mode。

```lua
init = function()
  local keys = require("lazyvim.plugins.lsp.keymaps").get()
  -- disable a keymap
  keys[#keys + 1] = { "K", false }
  keys[#keys + 1] = { "gt", false }
  keys[#keys + 1] = { "<c-k>", false, mode = "i" }
  keys[#keys + 1] = { "gh", vim.lsp.buf.hover, desc = "Hover" }
end,

```

## init 方式的 keys 的禁用
```lua
init = function()
  local keys = require("lazyvim.plugins.lsp.keymaps").get()
  -- disable a keymap
  keys[#keys + 1] = { "K", false }
  keys[#keys + 1] = { "gt", false }
  keys[#keys + 1] = { "gh", vim.lsp.buf.hover, desc = "Hover" }
end,

```


## keys 的禁用
```lua
{
    "folke/noice.nvim",
    -- 这里注意一定是小写字母
    keys = {
      { "<c-f>", false, mode = { "i", "n", "s" } },
      { "<c-b>", false, mode = { "i", "n", "s" } },
    },
  }

  ```



## 开启折叠
```lua
{
    "nvim-treesitter/nvim-treesitter",
    opts = {
      ensure_installed = { "bash", "help", "html", "css", "scss", "javascript", "json", "lua", "bash", "markdown", "markdown_inline", "python", "query", "regex", "tsx", "typescript", "vim", "yaml", },
    },
    init = function()
      -- 开启 Folding
      vim.wo.foldmethod = "expr"
      vim.wo.foldexpr = "nvim_treesitter#foldexpr()"
      -- 默认不要折叠
      -- https://stackoverflow.com/questions/8316139/how-to-set-the-default-to-unfolded-when-you-open-a-file
      vim.wo.foldlevel = 99
    end,
  }

  ```


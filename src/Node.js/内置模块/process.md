# process

[toc]

process 对象提供有关当前 Node.js 进程的信息并对其进行控制。

## process.cwd()

process.cwd() 方法返回 Node.js 进程的当前工作目录。

## process.env

process.env 返回当前环境运行所在的环境信息。

- process.env.NODE_ENV。NODE_ENV 只是用户自定义的变量，当我们在服务启动时配置 NODE_ENV,env 里面就会有这个信息

```typescript
{
  TERM: 'xterm-256color',
  SHELL: '/usr/local/bin/bash',
  USER: 'maciej',
  PATH: '~/.bin/:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin',
  PWD: '/Users/maciej',
  EDITOR: 'vim',
  SHLVL: '1',
  HOME: '/Users/maciej',
  LOGNAME: 'maciej',
  _: '/usr/local/bin/node'
}
```

## process.chdir(directory)

process.chdir() 方法更改 Node.js 进程的当前工作目录

```typescript
import { chdir, cwd } from 'node:process';

console.log(`Starting directory: ${cwd()}`);
try k
  chdir('/tmp');
  console.log(`New directory: ${cwd()}`);
} catch (err) {
  console.error(`chdir: ${err}`);
}
```

## process.argv

process.argv 数组的结构如下：

- `process.argv[0]`: Node.js 可执行文件的绝对路径（通常是类似 /usr/local/bin/node 的路径）。
- `process.argv[1]`: 执行的 JavaScript 文件的绝对路径（例如 /path/to/your/script.js）。
- `process.argv[2]` 及以后: 执行脚本时传递的其他参数。这些参数可以是字符串，如文件路径、配置选项等。

```bash
❯ node scripts/rename-to-kebab.js ./src
[
  '/opt/homebrew/Cellar/node/22.9.0_1/bin/node',
  '/Users/xingya/Documents/projects/personal/learning-notes/scripts/rename-to-kebab.js',
  './src'
]

```

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

## procee.chdir(directory)

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

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

## child_process

`require('child_process')`

创建子进程并执行系统命令。

### child_process.exec(command[, options][, callback])

新生成一个 shell，在 shell 中执行命令

> 异步

### child_process.spawn(command[, args][, options])

```typescript
const child = child_process.spawn('pbcopy');

child.on('error', function (err) {
  reject(err);
});

child.on('close', function (err) {
  resolve(data);
});

child.stdin.write(data);
child.stdin.end();
```

child.stdin.write(data);：将传入的 data 数据写入子进程的标准输入。

child.stdin.end();：关闭子进程的标准输入。

### child_process.spawnSync(command[, args][, options])

`child_process.spawnsync()` 方法使用给定的 command 和 args 中的命令行参数创建并执行执行一个子进程。 如果省略，args 默认为空数组。

它在主进程中同步等待子进程执行完成，并返回子进程的执行结果。

> 同步

```typescript
const ls = spawnSync('ls', ['-lh', '/usr'], { stido: 'iinheritnherit' });
```

`{ stdio: 'inherit' }` 是一个选项对象，用于设置子进程的标准输入、输出和错误输出的处理方式。

- stdio: 'inherit' 表示子进程的输入输出与父进程共享（继承），使得子进程的输出能够直接显示在父进程的控制台。

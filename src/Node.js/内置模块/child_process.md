# child_process

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

## spawnSync

spawnSync 方法用于在子进程中执行命令并返回其输出。

```ts
const fzfResult = spawnSync('fzf', ['--tac'], {
  input: propValue,
  stdio: 'pipe',
  shell: true,
  encoding: 'utf-8',
});
```

- input: propValue（传入数据）：
  input 选项用来传递给子进程的输入数据。
  propValue 是你需要提供给 fzf 的数据内容。这个数据将通过管道传递给子进程的标准输入（stdin）。

- stdio: 'pipe'（标准输入输出和错误流）：
  stdio 选项指定了子进程与父进程之间的标准输入、标准输出和标准错误流的配置。
  'pipe' 表示使用管道。这意味着你可以在父进程中捕获子进程的输出和错误信息，也可以通过管道传递输入。
  'pipe' 其实等同于 ['pipe', 'pipe', 'pipe']，即标准输入、标准输出和标准错误流都使用管道。

- shell: true（使用shell）：
  shell 选项为 true 表示通过 shell 来执行命令。
  这允许你在命令中使用 shell 的特性，比如环境变量和 shell 脚本。
  但是开启 shell 选项时，需要小心命令注入问题。

- encoding: 'utf-8'（编码）：
  encoding 选项指定了子进程的标准输入和输出的文本编码。
  utf-8 编码会将标准输入和输出数据当作 UTF-8 编码的文本处理，并返回字符串。
  如果不指定 encoding，默认返回 Buffer 对象。

## execSync

运行一个命令，并将其全部输出（包括标准输出和标准错误）收集到一个字符串，等待命令执行完成后再返回。

```ts
execSync(`pnpm run ${key}`, { stdio: 'inherit' });
```

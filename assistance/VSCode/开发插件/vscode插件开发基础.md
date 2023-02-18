# vscode 插件开发基础

可以开发一些插件来达到提效的目的，准备开发的有

* [ ] 根据 swagge 生成 ts



## 生成一个插件项目

```bash
npm install -g yo generator-code

yo code

# 接下来会进入交互式的 UI 中。按照要求填写即可
```



## 项目结构

### `extension.ts` 

`extension.ts` 这个是入口文件。里面会有个 `activate()` 

```typescript
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('swagger-to-ts.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('你好你好，这是我写的插件');
	});

	context.subscriptions.push(disposable);
}
```

这里是使用 `registerCommand(command:string, callback: (...args: any[]) => any)`，来实现你在 `package.json` 中定义的一些命令。



### `package.json`

```javascript
{
  // 扩展的激活事件
  "activationEvents": [
    "onCommand:swagger-to-ts.helloWorld"
  ],
  
  // 入口文件
  "main": "./out/extension.js",
  
  // 插件大部分功能配置都在这里
  "contributes": {
    
    // 命令
    "commands": [
      {
        "command": "swagger-to-ts.helloWorld",
        "title": "Hello World"
      }
    ],
    // 快捷键绑定
    "keybindings": [
      {
        "command": "swagger-to-ts.helloWorld",
        "key": "ctrl+f10",
        "mac": "ctrl+f10",
        "when": "editorTextFocus"
      }
    ],
    // 菜单
    "menus": {
      "editor/context": [
        {
          "when": "editorFocus",
          "command": "swagger-to-ts.helloWorld",
          "group": "navigation"
        }
      ]
    }
  },
}
```



## 调试

1. 在写插件的这个项目中，使用 debugger 功能，选择 `run extension` 的方式。这时候会新打开一个 vscode 项目。我们在新打开的项目中调试我们的插件功能
2. 当插件更新后，使用 `cmd + R` 重新加载

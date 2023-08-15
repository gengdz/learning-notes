# vite.config.ts

配置如下：

```typescript
// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'MyLib',
      formats: ['es', 'cjs'],
      // fileName: 'my-lib',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react'],
      output: {
        dir: 'lib', // 指定输出目录
        format: 'cjs', // 指定输出格式
        entryFileNames: '[name].js', // 指定了打包后每个输出文件名格式。其中 [name] 由入口文件名称决定。如果入口文件名称为 main 那么输出的文件名为 main.js。如果不配置入口文件名那么为 index
        exports: 'auto', // 指定了导出方式
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: 'React',
        },
      },
    },
  },
});
```

## 配置说明

### build

构建选项。使用 rollup 进行构建。

#### build.lib

构建为库模式。当你需要将项目打包成一个或多个独立的 JavaScript 模块，以供其他项目引用时，就需要配置 build.lib。

- entry：打包的入口文件路径
- name：暴露的全局变量，UMD 模式中模块名称需要作为一个全局变量被暴露处理。
- fileName：输出的文件名

### build.rollupOptions

### external

作用是：这些包不会打包到 bundle 文件中。

- 如果是通过 UMD 的方式用这些包，需要在 HTML 模板中加上这些 external 的包。
- 如果是通过 ESM/UMD 的方式用这些包，需要通过 npm 包的方式加上这些 external 的包

### output

#### globals

globals 作用是：为 external 的包，提供全局变量。

key:value 的形式中
key 是 package.json 中的 name
value 是这个包提供的 UMD 包中暴露到全局的变量，不是随便写的。

如果通过 UMD 的方式引用，external 之后，需要在 html 模板中加上 external 的包。

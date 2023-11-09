import { defineConfig } from 'vite';
import path from 'path';

const postcssPresetEnv = () => {};

defineConfig(({ command, mode }) => {
  return {
    optimizeDeps: {
      include: [], // 进行依赖预构建
      exclude: [], // 不进行依赖预构建
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: '[hash].[name].[ext]',
        },
      },
      outDir: 'dist', // 默认 dist
      assetsDir: 'static', // 默认 assets
      emptyOutDir: true, // 默认就是 true, 清除输出目录
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode), // 往全局上挂变量
    },
    css: {
      devSourcemap: true, // 是否生成类名的映射
      modules: {
        localsConvention: 'camelCaseOnly', // 在 JS 文件只能通过驼峰的方式引用 CSS 类名
        generateScopedName: '[name]-[local]-[hash:base64:5]', // 生成的类名格式
        globalModulePaths: [/path\/to\/legacy-styles/], // 不想参与到css模块的路径
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "theme/variables.scss";`,
        },
        less: {
          math: 'always', // 怎么解析算术 默认只有 padding: (100px / 2) 会被解析，padding: 100px / 2 不会被解析。 always 就是都要做解析
          // 全局变量
          globalVars: {
            mainColor: 'red',
          },
        },
      },
      postcss: {
        plugins: [postcssPresetEnv()],
      },
    },
  };
});

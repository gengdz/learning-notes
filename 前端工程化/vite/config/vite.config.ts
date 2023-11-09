import { defineConfig, mergeConfig } from 'vite';
import baseConfig from './vite.base.config';
import devConfig from './vite.dev.config';
import prodConfig from './vite.prod.config';

const envResolver = {
  serve: mergeConfig(baseConfig, devConfig),
  build: mergeConfig(baseConfig, prodConfig),
};

export default defineConfig(({ command }) => {
  return envResolver[command];
});

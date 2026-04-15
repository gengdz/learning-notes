import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: { singleQuote: true },
  lint: {
    options: { typeAware: true, typeCheck: true },
    rules: { "typescript/no-deprecated": "error" },
  },
  run: {
    cache: true,
  },
});

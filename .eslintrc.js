/** @type {import("eslint").ESLint.Options} */

export default {
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-empty': 'warn',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
  ignorePatterns: ['src/TypeScript/type-challenges/*'],
};

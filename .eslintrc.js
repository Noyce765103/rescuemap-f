
module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: 'vue-eslint-parser',
  plugins: ['vue', 'prettier'],
  extends: ['plugin:vue/essential', '@vue/standard', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never',
        },
        svg: 'always',
        math: 'always',
      },
    ],
  },
  globals: {
    AMap:'readonly',
    AMapUI:'readonly',
  }
};

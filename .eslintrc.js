module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:compat/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    parser: 'babel-eslint',
  },
  root: true,
  rules: {
    'no-param-reassign': ['error', { props: false }],
  },
};

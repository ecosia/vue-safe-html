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
    parser: '@babel/eslint-parser',
  },
  root: true,
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', '**/*.test3.js'] }],
    'no-param-reassign': ['error', { props: false }],
    'operator-linebreak': ['error', 'after'],
  },
};

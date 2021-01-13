module.exports = {
  collectCoverage: true,
  transform: {
    '^.+\\.js$': ['babel-jest', { rootMode: 'upward' }],
  },
  projects: [
    {
      displayName: 'Vue 2',
    },
    {
      displayName: 'Vue 3',
      testMatch: ['**/?(*.)+(test3).[jt]s?(x)'],
      moduleNameMapper: {
        '^vue$': '<rootDir>/node_modules/vue3',
        '^@vue/test-utils$': '<rootDir>/node_modules/@vue/test-utils3',
      },
    },
  ],
};

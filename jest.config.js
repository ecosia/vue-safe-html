export default {
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
        '^vue$': 'vue3',
        '^@vue/test-utils$': '@vue/test-utils3',
      },
    },
  ],
};

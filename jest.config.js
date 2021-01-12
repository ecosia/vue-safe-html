module.exports = {
  collectCoverage: true,
  transform: {
    '^.+\\.js$': ['babel-jest', { rootMode: 'upward' }],
  },
};

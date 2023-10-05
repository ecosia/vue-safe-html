const { resolve } = require('path');

const _module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
  ],
};

module.exports = [
  {
    entry: './src/index.js',
    output: {
      filename: 'main.common.js',
      path: resolve(__dirname, 'dist'),
      library: 'VueSafeHTML',
      libraryTarget: 'commonjs2',
      globalObject: '(typeof self !== \'undefined\' ? self : this)',
    },
    mode: 'production',
    module: _module,
  },
  {
    entry: './src/index.js',
    output: {
      filename: 'main.esm.js',
      path: resolve(__dirname, 'dist'),
      libraryTarget: 'module',
      globalObject: '(typeof self !== \'undefined\' ? self : this)',
    },
    mode: 'production',
    experiments: {
      outputModule: true, // Enable the "experiments.outputModule" option
    },
    module: _module,
  },
];

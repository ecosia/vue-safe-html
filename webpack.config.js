import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), 'dist');
// eslint-disable-next-line no-underscore-dangle
const _module = {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    },
    resolve: {
      fullySpecified: false,
    },
  }],
};

export default [{
  entry: './src/index.js',
  output: {
    filename: 'main.common.js',
    path: dist,
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
    path: dist,
    libraryTarget: 'module',
    globalObject: '(typeof self !== \'undefined\' ? self : this)',
  },
  mode: 'production',
  experiments: {
    outputModule: true, // Enable the "experiments.outputModule" option
  },
  module: _module,
}];

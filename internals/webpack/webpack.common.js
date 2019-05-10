const path = require('path');
const webpack = require('webpack');

const DIR_SRC = './src';
const DIR_DEST = 'build';

const plugins = [
  new webpack.ProvidePlugin({
    THREE: 'three'
  })
];

module.exports = {
  entry: {
    'react-three-viewer': path.resolve(DIR_SRC, 'index.js'),
    'react-three-viewer.min': path.resolve(DIR_SRC, 'index.js')
  },
  output: {
    filename: '[name].js',
    library: 'RTV',
    libraryTarget: 'umd',
    path: path.resolve(DIR_DEST),
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    modules: [DIR_SRC, 'node_modules']
  },
  plugins: plugins
};

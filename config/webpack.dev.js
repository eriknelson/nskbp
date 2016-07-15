const webpack = require('webpack');
const path = require('path');

const projRoot = path.join(__dirname, '..');
const srcRoot = path.join(projRoot, 'src');
const buildDir = path.join(projRoot, 'build');
const sharedStylesDir = path.join(srcRoot, 'shared', 'styles');

const wpConfig = {
  debug: true,
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(srcRoot, 'main')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: srcRoot,
        exclude: /test.*spec.js$/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        include: srcRoot
      },
      {
        test:/\.json$/,
        loader: 'json'
      }
    ]
  },
  output: {
    filename: 'nskbp.js',
    path: buildDir,
    // http://stackoverflow.com/questions/28846814/what-does-publicpath-in-webpack-do
    // WP needs to know where the generated bundle will be hosted so it can request
    // chunks or references files loaded with certain loaders.
    publicPath: '/public/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.jsx', '.js', '.json']
  },
  sassLoader: {
    includePaths: [sharedStylesDir]
  }
};

module.exports = wpConfig;

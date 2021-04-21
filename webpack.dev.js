/* eslint-disable no-undef */
const common = require('./webpack.common');
const path = require('path');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  devtool: 'source-map',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
});

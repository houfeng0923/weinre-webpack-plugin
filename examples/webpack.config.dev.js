const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'dist');
const contextPath = path.resolve(__dirname, 'src');
const ENV = process.env.NODE_ENV || 'development';

const WeinreWebpackPlugin = require('../index.js');

const config = {
  // cache: true,
  context: contextPath,
  // Entry points to the project
  entry: {
    index: ['./index.js'],
  },
  // Server Configuration options
  devServer: {
    contentBase: './dist', // Relative directory for base of server
    // hot: true,
    inline: true,
    port: 3000, // Port Number
    host: '0.0.0.0', // Change to '0.0.0.0' for external facing server
  },
  devtool: 'source-map', // 'source-map',
  output: {
    path: buildPath, // Path of output file
    filename: 'index.js',
  },
  plugins: [
    new WeinreWebpackPlugin(),
  ],
  module: {
    rules: [],
  },
};

module.exports = config;

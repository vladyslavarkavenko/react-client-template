/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

const config = {
  entry: './src/server',
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [new Dotenv({ path: './config/development.env' })],
};

module.exports = config;

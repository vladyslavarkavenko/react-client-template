/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const Dotenv = require('dotenv-webpack');
const nodeExternals = require('webpack-node-externals');

const config = {
  devtool: 'none',
  entry: './src/server',
  mode: 'production',
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
  plugins: [new Dotenv({ path: './config/production.env' })],
};

module.exports = config;

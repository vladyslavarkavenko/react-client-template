/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// TODO: Set up clean webpack plugin.
// TODO: MiniCssExtractPlugin breaks hot reload for styles.

const config = {
  devtool: 'cheap-module-eval-source-map',
  entry: './app/client/index.js',
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'ssr-template.txt'
    }),
    new ReactLoadablePlugin({
      filename: './public/react-loadable.json'
    }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].[hash].css',
    // }),
    new OptimizeCSSAssetsPlugin(),
    new Dotenv({ path: './config/development.env' })
  ]
};

module.exports = config;

/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const config = {
  devtool: 'none',
  entry: './app/client/index.js',
  mode: 'production',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    // new CleanWebpackPlugin(),
    new ReactLoadablePlugin({
      filename: './public/react-loadable.json',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'ssr-template.txt',
      inlineSource: '.(css)$',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new OptimizeCSSAssetsPlugin(),
  ],
};

module.exports = config;

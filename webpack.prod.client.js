/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const publicPath = path.resolve(__dirname, 'dist');

const config = {
  devtool: 'none',
  entry: path.resolve(__dirname, 'src/client'),
  mode: 'production',
  output: {
    filename: '[name].js',
    path: publicPath,
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
          {
            loader: 'eslint-loader',
          },
        ],
      },
      // {
      //     test: /\.css$/,
      //     include: path.resolve(__dirname, 'src/common/assets/styles'),
      //     use: ['style-loader', 'css-loader'],
      // },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src/common/assets/styles'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer()],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff)$/i,
        include: path.resolve(__dirname, 'src/common/assets/images'),
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new ReactLoadablePlugin({
      filename: path.resolve(__dirname, 'dist', 'react-loadable.json'),
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
    new CompressionPlugin(),
    new Dotenv({ path: './config/production.env' }),
  ],
};

module.exports = config;

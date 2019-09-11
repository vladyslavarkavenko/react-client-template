// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config.dev.js');

// TODO: Split config out.
const port = 8000;
const options = {
  contentBase: './public',
  hot: true,
  host: 'localhost',
  overlay: {
    warnings: false,
    errors: true,
  },
  disableHostCheck: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  proxy: {
    '/': 'http://localhost:3000',
    '/public': 'http://localhost:3000', // Why we need this?
  },
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, options);
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, options);

server.listen(port, 'localhost', (err) => {
  console.log(err
    ? `${err}\nError setting up dev server.`
    : `Dev server listening on port ${port}`);
});

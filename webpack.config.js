const path = require('path');
const webpack = require('webpack');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __DEMO__: JSON.stringify(JSON.parse(process.env.BUILD_DEMO || 'false')),
  'process.env.NODE_ENV': '"development"',
});

module.exports = {
  entry: {
    _app_compiled: './src/cafienne-ui.js',
    // service_worker: './src/service-worker/index.js',
  },
  output: {
    path: 'build',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'bower_components/polymer-redux'),
        ],
      },
    ],
  },
  plugins: [
    definePlugin,
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /no-other-locales-for-now/),
  ],
};

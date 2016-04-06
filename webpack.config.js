const path = require('path');
const webpack = require('webpack');

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __DEMO__: JSON.stringify(JSON.parse(process.env.BUILD_DEMO || 'false')),
});

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: {
    _app_compiled: './cafienne-ui.js',
  },
  output: {
    path: 'build',
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /.js$/,
        include: [
          path.resolve(__dirname, 'app'),
        ],
      },
    ],
  },
  plugins: [
    definePlugin,
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /no-other-locales-for-now/),
  ],
};

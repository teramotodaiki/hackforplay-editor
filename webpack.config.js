const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    editor: './src/editor',
    "editor.min": './src/editor'
  },
  output: {
    path: __dirname + '/public/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: ["babel"],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loaders: ["style", "css"]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};

const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');

module.exports = {
  entry: './src/editor',
  output: {
    path: __dirname + '/public/',
    filename: 'editor.js'
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
    new WebpackNotifierPlugin()
  ]
};

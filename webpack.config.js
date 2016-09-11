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
        loaders: ["babel-loader"],
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

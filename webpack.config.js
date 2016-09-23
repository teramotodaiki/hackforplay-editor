const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    editor: './src/editor'
  },
  output: {
    path: __dirname + '/public/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  devServer: {
    contentBase: 'public'
  },
};

if (process.env.NODE_ENV === 'production') {
  const uglify = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  });
  config.plugins.push(uglify);
}

module.exports = config;

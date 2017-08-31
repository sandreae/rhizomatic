const webpack = require('webpack')
const path = require('path')

const config = {
  context: path.resolve(__dirname, 'app'),
  entry: './init.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
      }
    },
  },
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
      include: path.resolve(__dirname, 'app'),
      use: [{
        loader: 'url-loader',
        options: { limit: 10000 } // Convert images < 10k to base64 strings
      }]
    }, {
      test: /\.scss$/,
      include: path.resolve(__dirname, 'app'),
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.css$/,
      include: path.resolve(__dirname, 'app'),
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.js$/,
      include: path.resolve(__dirname, 'app'),
      use: [{
        loader: 'babel-loader',
        options: { presets: ['es2015'] }
      }]
    }, {
      test: /\.jst$/,
      include: path.resolve(__dirname, 'app'),
      use: [{loader: 'underscore-template-loader'}]
    }
  ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({
      _: 'underscore',
      $: 'jquery',
      jQuery: 'jquery',
      Backbone: 'backbone',
      Bb: 'backbone',
      Marionette: 'backbone.marionette',
      Mn: 'backbone.marionette',
      alertify: 'alertifyjs',
    }),
  ]
}

module.exports = config

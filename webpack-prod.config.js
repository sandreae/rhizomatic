const webpack = require('webpack')
const path = require('path')

const config = {
  context: path.resolve(__dirname, 'app'),
  entry: './init.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  module: {
    rules: [{
      test: /\.(jpe?g|png|gif)$/i,
      loader:"file-loader",
      query:{
        name:'[name].[ext]',
        outputPath:'images/'
      }
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
      loaders: ["style-loader","css-loader"]
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
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.ProvidePlugin({
      _: 'underscore',
      $: 'jquery',
      jQuery: 'jquery',
      "window.jQuery": "jquery'",
      "window.$": "jquery",
      Backbone: 'backbone',
      Bb: 'backbone',
      Marionette: 'backbone.marionette',
      Mn: 'backbone.marionette',
      alertify: 'alertifyjs',
    }),
  ]
}

module.exports = config

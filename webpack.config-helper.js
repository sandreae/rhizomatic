'use strict';
const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');


module.exports = (options) => {

  let webpackConfig = {
    devtool: options.devtool,
    output: {
      path: Path.join(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, x-access-token, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
      'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      }),
      new HtmlWebpackPlugin({
        template: './app/theme/index.html'
      }),
      new Webpack.ProvidePlugin({
        _: 'underscore',
        $: 'jquery',
        jQuery: 'jquery',
        Backbone: 'backbone',
        Bb: 'backbone',
        Marionette: 'backbone.marionette',
        Mn: 'backbone.marionette',
      }),
      new ExtractTextPlugin('style.css')
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['syntax-async-functions', 'transform-regenerator'],
        },
      }, {
        test: /\.jst$/,
        loader: 'underscore-template-loader',
      },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css!sass')
        },

        {
          test: /\.css$/, 
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }
      ],
    },
    resolve: {
      //fallback: path.resolve(__dirname, 'node_modules'),
      root: Path.join(__dirname, './app/components'),
    },
    resolveLoader: {
      root: Path.join(__dirname, './node_modules'),
    }
  };

  if (options.isProduction) {

    webpackConfig.plugins.push(
      new Webpack.optimize.DedupePlugin(),
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
        mangle: {screw_ie8: true, keep_fnames: true}
      }),
      new Webpack.optimize.OccurenceOrderPlugin(),
      new Webpack.optimize.AggressiveMergingPlugin()
      );

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin(),
      new DashboardPlugin()
    );

    webpackConfig.devServer = {
      hot: true,
      port: options.port,
      inline: true,
      progress: true,
      proxy: {
      '/api/*': {
        target: 'http://localhost:3000'
        }
      },
    };
  }

  webpackConfig.entry = [];
  if (!options.isProduction) {
    webpackConfig.entry.push(`webpack-dev-server/client?http://localhost:${options.port}`);
    webpackConfig.entry.push('webpack/hot/dev-server');
  }
  webpackConfig.entry.push('./core/init');

  return webpackConfig;

};

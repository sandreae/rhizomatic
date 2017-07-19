module.exports = require('./webpack.config-helper')({
  isProduction: false,
  devtool: 'eval',
  port: 8080,
  headers: {
	  'Access-Control-Allow-Origin': '*',
	  'Access-Control-Allow-Credentials': 'true',
	  'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, x-access-token, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
	  'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT'
	},
});

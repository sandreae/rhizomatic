var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var morgan = require('morgan')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pubs')

var app = express()

app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}))
app.use(morgan('dev'))

// JUST FOR DEV COMMUNICATION FOR WEBPACKS PROXY SERVER ///

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
})

/////////////////ROUTES///////////////////////

var pubRoutes = require('./server/router/pub')(app, express)
app.use('/api', pubRoutes)

var rhizomeRoutes = require('./server/router/rhizome')(app, express)
app.use('/api', rhizomeRoutes)

var userRoutes = require('./server/router/user')(app, express)
app.use('/api', userRoutes)

var uploadRoutes = require('./server/router/uploads')(app, express)
app.use('/api', uploadRoutes)

// ANY ROUTE AFTER THIS NEEDS AUTHENTICATION //

var authenticateRoutes = require('./server/router/authenticate')(app, express)
app.use('/api', authenticateRoutes)

///////////////////////////////////////////////

var port = 3000

app.listen(port)
console.log('serve on' + port)

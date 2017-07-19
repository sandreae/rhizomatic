var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var morgan = require('morgan')
// var cors = require('cors')
const path = require('path');

var mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

console.log(process.env.MONGODB_URI);

var app = express()

//////JUST FOR DEV////////
// app.use(cors())
//////////////////////////

app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/dist'));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
// JUST FOR DEV COMMUNICATION FOR WEBPACKS PROXY SERVER ///

/* app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, x-access-token, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  next();
}) */

/////////////////ROUTES///////////////////////


var rhizomeRoutes = require('./server/router/rhizome')(app, express)
app.use('/api', rhizomeRoutes)

var uploadRoutes = require('./server/router/uploads')(app, express)
app.use('/api', uploadRoutes)

var pubRoutes = require('./server/router/pub')(app, express)
app.use('/api', pubRoutes)

// ANY ROUTE AFTER THIS NEEDS AUTHENTICATION //

var authenticateRoutes = require('./server/router/authenticate')(app, express)
app.use('/api', authenticateRoutes)

///////////////////////////////////////////////

var userRoutes = require('./server/router/user')(app, express)
app.use('/api', userRoutes)

app.listen(process.env.PORT || 8080, function() {
  console.log('Express server is up and running!');
});

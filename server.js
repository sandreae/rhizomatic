/////////PACKAGES/////////////

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')

var jwt = require('jsonwebtoken')
var path = require('path');
var config = require('./server/config')

/////////CONFIG/////////////

var port = process.env.PORT || 3000
var promise = mongoose.connect(config.database, {
  useMongoClient: true,
});

app.set('superSecret', config.secret);

//////JUST FOR DEV////////
// var cors = require('cors')
// app.use(cors())
//////////////////////////

app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}))
app.use(morgan('dev'))
app.use(express.static(__dirname + '/dist'));
app.use('/uploads',  express.static(__dirname + '/uploads'));

/////////////////UNPROTECTED ROUTES///////////////////////

var userRoutes = require('./server/router/user')(app, express)
app.use('/api', userRoutes)

var rhizomeRoutes = require('./server/router/rhizome')(app, express)
app.use('/api', rhizomeRoutes)

var pubRoutes = require('./server/router/pub')(app, express)
app.use('/api', pubRoutes)

var uploadRoutes = require('./server/router/uploads')(app, express)
app.post('/uploads', uploadRoutes.onUpload);
app.delete('/uploads/:uuid', uploadRoutes.onDeleteFile);

var emailRoutes = require('./server/router/email')(app, express)
app.use('/send', emailRoutes.sendMail)

/////////////////PROTECTED ROUTES/////////////////////////

var authenticateRoutes = require('./server/router/authenticate')(app, express)
app.use('/api', authenticateRoutes)

var userRoutesProtected = require('./server/router/user_protected')(app, express)
app.use('/api', userRoutesProtected)

app.listen(port, function() {
  console.log('Express server is up and running!');
});

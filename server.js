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
app.use(express.static(__dirname));

////////////S3 UPLOADS/////////////////////

const aws = require('aws-sdk');
app.engine('html', require('ejs').renderFile);
const S3_BUCKET = process.env.S3_BUCKET_NAME;
aws.config.region = 'us-east-2';

app.get('/sign-s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 7200,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

/////////////////UNPROTECTED ROUTES///////////////////////

var userRoutes = require('./server/router/user')(app, express)
app.use('/api', userRoutes)

var rhizomeRoutes = require('./server/router/rhizome')(app, express)
app.use('/api', rhizomeRoutes)

var pubRoutes = require('./server/router/pub')(app, express)
app.use('/api', pubRoutes)

var emailRoutes = require('./server/router/email')(app, express)
app.use('/api', emailRoutes)

/////////////////PROTECTED ROUTES/////////////////////////

var authenticateRoutes = require('./server/router/authenticate')(app, express)
app.use('/api', authenticateRoutes)

var userRoutesProtected = require('./server/router/user_protected')(app, express)
app.use('/api', userRoutesProtected)

///////////////// KEEP AWAKE /////////////////////////

var http = require('http');
setInterval(function() {
  http.get("http://rhizomatic-web-zine.herokuapp.com");
}, 30000000); // every 5hrs (30000000)

app.listen(port, function() {
  console.log('Express server is up and running!');
});

var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer({ dest: 'public/uploads/' })
var morgan = require('morgan')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/pubs')

var app = express()

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json({limit: '20mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '20mb'}))
app.use(morgan('dev'))

// ROUTES

// upload routes
app.post('/upload', upload.single('file'), function (req, res, next) {
  if (!req.file.mimetype.startsWith('image/')) {
    return res.status(422).json({
      error: 'The uploaded file must be an image'
    })
  }

  return res.status(200).send(req.file)
})

// pub routes
var pubRoutes = require('./app/router/pub')(app, express)
app.use('/api', pubRoutes)

// user routes
var userRoutes = require('./app/router/user')(app, express)
app.use('/api', userRoutes)

// user routes
var rhizomeRoutes = require('./app/router/rhizome')(app, express)
app.use('/api', rhizomeRoutes)

var port = 3000

app.listen(port)
console.log('serve on' + port)

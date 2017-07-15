var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

module.exports = function(app, express) {
  var uploadRouter = express.Router()


// upload routes
  uploadRouter.post('/upload', upload.single('file'), function (req, res, next) {
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(422).json({
        error: 'The uploaded file must be an image'
      })
    }
    return res.status(200).send(req.file)
  })
  return uploadRouter
}

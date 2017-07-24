var multer = require('multer')
var upload = multer({ dest: 'uploads/' })


module.exports = function(app, express) {
  var uploadRouter = express.Router()
// upload routes
  uploadRouter.post('/uploads', upload.single('qqfilename'), function (req, res, next) {
    return res.status(200).send(req.file)
  })
  return uploadRouter
}

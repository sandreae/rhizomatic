var User = require('../models/user')
var jwt = require('jsonwebtoken')
var superSecret = 'TheAmazingKreskin'

module.exports = function(app, express) {

  var authenticateRoute = express.Router()

  authenticateRoute.post('/authenticate', function(req, res) {
    User.findOne({
      email: req.body.email
    }).select('userName email password permissions').exec(function(err, user) {
      if (err) {throw err}

      if (!user) {
        res.json({success: false, message: 'User not found'})
      } else {
        var validPassword = user.comparePassword(req.body.password)
        if (!validPassword) {
          res.json({success: false, message: 'Wrong password'})
        } else {
          var token = jwt.sign({
            userName: user.userName,
            email: user.email,
            _id: user._id,
            permissions: user.permissions
          }, superSecret, {
            expiresIn: '28d'
          })

          res.json({
            success: true,
            message: 'login ok',
            token: token,
            _id: user._id
          })
        }
      }
    })
  })

  authenticateRoute.use(function(req, res, next) {
    var token = req.body.token || req.params.token || req.headers['x-access-token']
    if (token) {
      jwt.verify(token, superSecret, function(err, decoded) {
        if (err) {
          return res.status(401).send({success: false, message: 'Failed to authenticate token'})
        } else {
          req.decoded = decoded
          console.log(req.decoded)
          next()
        }
      })
    } else {
      return res.status(401).send({success: false, message: 'No token provided'})
    }
  })
  return authenticateRoute
}

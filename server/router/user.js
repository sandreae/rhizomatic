var User = require('../models/user')

module.exports = function (app, express) {

  var userRouter = express.Router()

  userRouter.route('/users')
    .post(function (req, res) {
      var user = new User({
        userName: req.body.userName,
        contributorNames: req.body.contributorNames,
        email: req.body.email,
        password: req.body.password,
        permissions: req.body.permissions,
        pendingPub: req.body.pendingPub,
        memberOf: req.body.memberOf
      })

      user.save(function(err) {
        if (err) {
          if (err.code === 11000) {
            return res.send({success: false, message: 'Duplicate userName.'})
          } else {
            return res.send(err)
          }
        } else {
          res.send(user)
        }
      })
    })
  return userRouter
}

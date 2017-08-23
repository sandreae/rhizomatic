var User = require('../models/user')

module.exports = function (app, express) {

  var userRouterProtected = express.Router()

  userRouterProtected.route('/users')

    .get(function(req, res) {
      User.find(function(err, users) {
        if (err) {
          res.send(err)
        } else {
          return res.send(users)
        }
      })
    })

  userRouterProtected.route('/users/:user_id')
    .get(function(req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) {
          res.send(err)
        } else {
          return res.send(user)
        }
      })
    })

    .put(function(req, res) {
      User.findById(req.params.user_id, function (err, user) {
      	console.log(user)
      	console.log(req.body.contributorNames)
        if (err) res.send(err)
        if (req.body.userName) user.userName = req.body.userName
        if (req.body.contributorNames) user.contributorNames = req.body.contributorNames
        if (req.body.email) user.email = req.body.email
        if (req.body.password) user.password = req.body.password
        if (req.body.permissions) user.permissions = req.body.permissions
        if (req.body.pendingPub) user.pendingPub = req.body.pendingPub
        if (req.body.memberOf) user.memberOf = req.body.memberOf

        user.save(function(err) {
          if (err) {
          	console.log(err)
          } else {
            console.log('pub updated')
            return res.send(user)
          }
        })
      })
    })

    .delete(function (req, res) {
      console.log(req.params)
      User.findById(req.params.user_id, function (err, user) {
        if (user.permissions === 'admin') {
          User.remove({_id: req.params.user_id}, function (err, user) {
            if (err) {
              res.send(err)
            } else {
              res.send('')
            }
          })
        } else {
          res.status(403).send({success: false, message: 'User is not authorized to delete users'})
        }
      })
    })
  return userRouterProtected
}

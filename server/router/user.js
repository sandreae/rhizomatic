var bodyParser = require('body-parser')
var User = require('../models/user')
var jwt = require('jsonwebtoken')
var superSecret = 'TheAmazingKreskin'
var _ = require('underscore')

module.exports = function (app, express) {
  var userRouter = express.Router()

  userRouter.route('/users')
    .post(function (req, res) {
      var user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        permissions: req.body.permissions || [],
        pendingPub: req.body.pendingPub,
        memberOf: req.body.memberOf
      })

      user.save(function(err) {
        if (err) {
          if (err.code === 11000) {
            return res.send({success: false, message: 'Duplicate useruserName.'})
          } else {
            return res.send(err)
          }
        } else {
          res.send(user)
        }
      })
    })

    .get(function(req, res) {
      User.find(function(err, users) {
        if (err) {
          res.send(err)
        }
        res.send(users)
      })
    })

  userRouter.route('/users/:user_id')
    .get(function(req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) {
          res.send(err)
        }
        res.send(user)
      })
    })

    .put(function(req, res) {
      User.findById(req.params.user_id, function (err, user) {
        if (err) res.send(err)
        if (req.body.userName) user.userName = req.body.userName
        if (req.body.email) user.email = req.body.email
        if (req.body.password) user.password = req.body.password
        if (req.body.permissions) user.permissions = req.body.permissions
        if (req.body.pendingPub) user.pendingPub = req.body.pendingPub
        if (req.body.memberOf) user.memberOf = req.body.memberOf

        user.save(function(err) {
          if (err)res.send(err)
          res.send(user)
        })
      })
    })

    .delete(function (req, res) {
      if (_.contains(req.decoded.permissions, 'admin')) {
        User.remove({_id: req.params.user_id}, function (err, user) {
          if (err) res.send(err)
          res.json({})
        })
      } else {
        return res.status(403).send({success: false, message: 'User is not authorized to delete users'})
      }
    })
  return userRouter
}

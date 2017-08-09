var mongoose = require('mongoose')
var Schema = mongoose.Schema
var bcrypt = require('bcrypt')

var UserSchema = new Schema({
  userName: String,
  contributorNames: Array,
  email: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true, select: false},
  permissions: String,
  pendingPub: Array,
  memberOf: String
})

UserSchema.pre('save', function(next) {
  var user = this
  if (!user.isModified()) {
    return next()
  }

  bcrypt.hash(user.password, 5, function( err, bcryptedPassword) {
    if (err) {
      return next(err)
    }
    user.password = bcryptedPassword
    next()
  });
})

UserSchema.methods.comparePassword = function(password) {
  var user = this
  console.log(this)
  return bcrypt.compareSync(password, user.password)
}

module.exports = mongoose.model('User', UserSchema)

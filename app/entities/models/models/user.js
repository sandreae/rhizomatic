import 'backbone-validation'

var User = Backbone.Model.extend({

  idAttribute: '_id',
  urlRoot: 'mongodb://heroku_8w1p98dh:kt9pri5eg9gq0gbej23tln67ia@ds113063.mlab.com:13063/heroku_8w1p98dh/api/users'
})

var Users = Backbone.Collection.extend({
  model: User,
  url: 'mongodb://heroku_8w1p98dh:kt9pri5eg9gq0gbej23tln67ia@ds113063.mlab.com:13063/heroku_8w1p98dh/api/users'
})

var UserAPI = {

  getUsers: function() {
    var users = new Users()
    var defer = $.Deferred()
    users.fetch({
      success: function(data) {
        _.each(data.toJSON(), function (item) {
          console.log('Successfully GOT user with _id: ' + item._id)
        })
        defer.resolve(data)
      },
      error: function() {
        console.log('Failed to GET users')
      }
    })
    return defer.promise()
  },

  getUser: function (id) {
    var user = new User({_id: id})
    var defer = $.Deferred()
    user.fetch({
      success: function(data) {
        defer.resolve(data)
      },
      error: function(data) {
        defer.resolve(undefined)
      }
    })
    return defer.promise()
  }
}

export {User, Users, UserAPI}

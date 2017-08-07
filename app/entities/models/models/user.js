import 'backbone-validation'

var User = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/api/users',
  defaults: {
    contributorNames: [''],
    permissions: '',
    pendingPub: false,
  }
})

var Users = Backbone.Collection.extend({
  model: User,
  url: '/api/users'
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

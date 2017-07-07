Platform.module('UsersApp.Edit', function(Edit, Platform, Backbone, Marionette, $, _){
  Edit.Controller = {
    editUser: function (id) {
      var fetchingUser = Platform.request('user:entity', id)
      $.when(fetchingUser).done(function (user) {
        var editView = new Edit.User({model: user})

        editView.on('form:submit', function (data) {
          user.set({
            userName: data.userName,
            email: data.email,
            password: data.password,
            permissions: ['admin']
          })
          user.save(null, {
            success: function () {
              Platform.trigger('users:list')
            }
          })
        })
        Platform.regions.main.show(editView)
      })
    }
  }
})

Platform.module('UsersApp.List', function (List, Platform, Backbone, Marionette, $, _) {

  List.Controller = {
    listUsers: function () {
      var fetchingUsers = Platform.request('users:entities')
      $.when(fetchingUsers).done(function (users) {
        var usersCompositeView = new List.UsersCompositeView({
          collection: users
        })

        usersCompositeView.on('childview:user:delete', function (childView, model) {
          model.destroy({wait: true}).done(function () {
            users.remove(model)
            childView.render()
          })
        })

        usersCompositeView.on('childview:user:edit', function (childView, model) {
          Platform.trigger('user:edit', model.get('_id'))
        })

        usersCompositeView.on('user:new', function () {
          Platform.trigger('user:new')
        })

        Platform.regions.main.show(usersCompositeView)
      })
    }
  }
})

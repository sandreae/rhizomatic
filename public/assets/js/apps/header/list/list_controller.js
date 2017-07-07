Platform.module('HeaderApp.List', function (List, Platform, Backbone, Marionette, $, _) {
  List.Controller = {

    listHeader: function () {
      var links = Platform.request('header:entities')
      var headers = new List.Headers({collection: links})

      headers.on('childview:navigate', function (childView, model) {
        var trigger = model.get('navigationTrigger')
        Platform.trigger(trigger)
      })

      Platform.regions.header.show(headers)
    },

    setActiveHeader: function (headerUrl) {
      var links = Platform.request('header:entities')
      var headerToSelect = links.find(function (header) { return header.get('url') === headerUrl })
      headerToSelect.select()
      links.trigger('reset')
    },

    updateUserInfo: function () {
      Platform.request('initialize:entities').done(function () {
        Platform.request('initializeUser:entities').done(function () {
          var user = Platform.request('getUser:entities')
          if (user.get('userName') === undefined) {
            user.set({userName: 'visitor'})
          }
          var userInfo = new List.User({model: user})
          Platform.regions.footer.show(userInfo)
          return user
        })
      })
    }
  }
})

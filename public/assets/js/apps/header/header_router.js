Platform.module('HeaderApp', function (Header, Platform, Backbone, Marionette, $, _) {
  var API = {
    listHeader: function () {
      Header.List.Controller.listHeader()
    },

    updateUserInfo: function () {
      Header.List.Controller.updateUserInfo()
    }
  }

  Platform.commands.setHandler('set:active:header', function (name) {
    Platform.HeaderApp.List.Controller.setActiveHeader(name)
  })

  Platform.on('updateUserInfo', function () {
    API.updateUserInfo()
  })

  Header.on('start', function () {
    API.listHeader()
    API.updateUserInfo()
  })
})

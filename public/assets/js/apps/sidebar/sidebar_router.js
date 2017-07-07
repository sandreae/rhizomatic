Platform.module('SidebarApp', function (SidebarApp, Platform, Backbone, Marionette, $, _) {

  var API = {
    sidebarOpen: function () {
      $('#sidenav-region').addClass('sidenavactive')
      document.getElementById('navclose').style.display = 'block'
    },

    sidebarClose: function () {
      $('#sidenav-region').removeClass('sidenavactive')
      document.getElementById('navclose').style.display = 'none'
    },

    checkUserStatus: function () {
      Platform.request('initialize:entities').done(function () {
        Platform.request('initializeUser:entities').done(function () {
          var user = Platform.request('getUser:entities')
          if (user.get('userName') === undefined) {
            SidebarApp.Show.Controller.showLogin()
          } else {
            Platform.trigger('user:listpubs')
          }
        })
      })
    },

    showLogin: function () {
      SidebarApp.Show.Controller.showLogin()
    }
  }

  Platform.on('sidebarOpen', function () {
    API.sidebarOpen()
  })

  Platform.on('sidebarClose', function () {
    API.sidebarClose()
  })

  Platform.on('updateUserInfo', function () {
    API.checkUserStatus()
  })

  Platform.on('start', function () {
    API.checkUserStatus()
  })
})

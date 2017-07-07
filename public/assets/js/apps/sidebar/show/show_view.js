Platform.module('SidebarApp.Show', function(Show, Platform, Backbone, Marionette, $, _){
  Show.Message = Marionette.ItemView.extend({
    template: '#login-message',

    events: {
      'click button.js-login': 'loginClicked'
    },

    loginClicked: function (e) {
      console.log('login clicked')
      e.stopPropagation()
      Platform.trigger('user:login')
    }
  })
})

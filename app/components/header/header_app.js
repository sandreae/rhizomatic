import * as HeaderApp from './list/list_controller'
import {gc} from '../radio'

var MainHandler = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'headers:list': 'listHeaders',
    'user:loggedIn': 'userLoggedIn',
    'user:loggedOut': 'userLoggedOut',
    'appState:changed': 'appStateChanged',
  },

  listHeaders: function() {
    console.log('listheaders')
    HeaderApp.Controller.listHeaders()
  },

  initialize: function() {
    HeaderApp.Controller.listHeaders()
  },

  userLoggedOut: function() {
    HeaderApp.Controller.userLoggedOut()
  },
  userLoggedIn: function(isAdmin) {
    HeaderApp.Controller.userLoggedIn()
  },

  appStateChanged: function() {
  },
})

HeaderApp.MainHandler = new MainHandler()

export {HeaderApp}

/*  var API = {

    updateUserInfo: function () {
      Header.List.Controller.updateUserInfo()
    }
  }

  Platform.on('updateUserInfo', function () {
    API.updateUserInfo()
  }) */


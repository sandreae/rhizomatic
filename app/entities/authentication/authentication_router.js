import config from './confirg_token'
import {Globals} from './globals'
import {Authentication} from './authentication'
import {gc} from '../../components/radio'

// import {Authentication} from './Authentication'

var Auth = {}
Auth.Authentication = Authentication
Auth.Globals = Globals

var Radio = Marionette.Object.extend({

  channelName: 'gc',

  //initialize: function() {
  //  gc.reply('pub:get', this.getPub);
  //},

  radioRequests: {
    'globals:get': 'getGlobals',
    'user:login': 'loginUser',
    'user:logout': 'logoutUser',
    'user:isAuthenticated': 'isAuth',
    'user:userPermissions': 'userPermissions',
    'user:init': 'initUser',
    'user:getKey': 'getKey',
    'user:getCurrentUser': 'getCurrentUser'
  },

  radioEvents: {
    'user:logout': 'logoutUser',
  },

  getGlobals: function() {
    return Globals;
  },

  logoutUser: function() {
    Authentication.logoutUser()
    gc.trigger('user:loggedOut')
    gc.request('user:init')
    gc.trigger('pubs:list')
  },

  isAuth: function(response) {
    Authentication.isAuth(response)
    gc.request('user:init')
  },

  userPermissions: function(permissions) {
    return Authentication.userPermissions(permissions);
  },

  initUser: function() {
    var key = Authentication.getKey()
    var appState = gc.request('appState:get')
    console.log('key')
    console.log(key)
    if (key !== null) {
      var user = Authentication.getCurrentUser()
      user.fetch().success(function () {
        gc.trigger('user:loggedIn')
        appState.set({userName: user.get('userName')})
        var permissions = Authentication.isAdmin(user.get('permissions'))
        if (permissions === true){appState.set({isAdmin: true})}
        else {appState.set({isAdmin: false})}
        gc.trigger('appState:changed', appState)
      })
    } else {
      appState.set({isAdmin: false})
      gc.trigger('appState:changed', appState)
    }
  },

  getKey: function() {
    return Authentication.getKey();
  },

  getCurrentUser: function() {
    return Authentication.getCurrentUser();
  },
})

var Radio = new Radio()

export {Auth}

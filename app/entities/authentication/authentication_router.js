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

  getGlobals: function() {
    return Globals;
  },

  logoutUser: function() {
    Authentication.logoutUser()
    console.log('user logged out')
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
    var userId = window.localStorage.userId
    var appState = gc.request('appState:get')
    if (key !== null) {
      gc.request('user:get', userId).then(function(user){
        console.log(user)
        gc.trigger('user:loggedIn')
        appState.set({
          userName: user.get('userName'),
          loggedIn: true
        })
        var permissions = Authentication.isAdmin(user.get('permissions'))
        if (permissions === true) {
          appState.set({isAdmin: true})
        } else {
          appState.set({isAdmin: false})
        }
        console.log(appState)
        gc.trigger('appState:changed', appState)
      })

    } else {
      appState.set({
        isAdmin: false,
        loggedIn: false,
        userName: null
      })
      gc.trigger('appState:changed', appState)
      gc.trigger('sidebar:show:login')
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

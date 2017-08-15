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
    return new Promise((resolve, reject) => {
      var appState
      var key = Authentication.getKey()
      var userId = window.localStorage.userId
      gc.request('appState:get').then(function(appState) {
        if (key !== null) {
          console.log(key)
          gc.request('user:get', userId).then(function(user) {
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
            console.log('user logged in')
            console.log(appState)
            gc.trigger('appState:changed', appState)
          })
        } else {
          appState.set({
            isAdmin: false,
            loggedIn: false,
            userName: null
          })
          console.log('user not logged in')
          console.log(appState)
          gc.trigger('appState:changed', appState)
        }
        return appState
      })
      resolve(appState)
    })
  },

  getKey: function() {
    return Authentication.getKey();
  },
})

var Radio = new Radio()

export {Auth}

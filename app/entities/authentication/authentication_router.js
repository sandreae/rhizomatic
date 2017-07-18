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

  loginUser: function() {
    gc.trigger('user:loggedIn')
  },

  logoutUser: function() {
    Authentication.logoutUser()
    gc.trigger('user:loggedOut')
  },

  isAuth: function(response) {
  	console.log('isAuth triggered')
    Authentication.isAuth(response)
    gc.trigger('user:loggedIn')
  },

  userPermissions: function(permissions) {
    console.log('userPermissions triggered')
    return Authentication.userPermissions(permissions);
  },

  initUser: function(permissions) {
    console.log('initUser triggered')
    return Authentication.initUser();
  },

  getKey: function() {
  	console.log('getKey triggered')
    return Authentication.getKey();
  },

  getCurrentUser: function() {
    console.log('user:get request recieved')
    return Authentication.getCurrentUser();
  },
})

var Radio = new Radio()

export {Auth}

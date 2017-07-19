import {gc} from '../../components/radio'
import {Globals} from './globals'

var user
var applicationInfo

var Authentication = {

  getKey: function() {
    return window.localStorage.getItem(Globals.auth.TOKEN_KEY);
  },

  isAuth: function(response) {
    window.localStorage.setItem(Globals.auth.TOKEN_KEY, response.token)
    window.localStorage.setItem(Globals.auth.USER_KEY, response._id)
  },

  isAdmin: function(permissions) {
    return _.contains(permissions, 'admin');
  },

  getAppInfo: function () {
    return appInfo
  },

  getCurrentUser: function () {
    user = new Platform.Entities.Users.User({_id: window.localStorage.userId})
    user.fetch().then(function () {
      return user
    })
    return user
  },

  logoutUser: function() {
    window.localStorage.removeItem(Globals.auth.TOKEN_KEY)
    window.localStorage.removeItem(Globals.auth.USER_KEY)
  },

}

export {Authentication}


/*

Platform.reqres.setHandler('authenticate', function (response) {
  return Authentication.authenticated(response)
})

Platform.reqres.setHandler('logout:entities', function () {
  return Authentication.logout()
})

Platform.reqres.setHandler('isAuthenticated', function () {
  return Authentication.isAuthenticated()
})

Platform.reqres.setHandler('initialize:entities', function () {
  return Authentication.initialize()
})

Platform.reqres.setHandler('initializeUser:entities', function () {
  return Authentication.initializeUser()
})

Platform.reqres.setHandler('getApplicationInfo:entities', function () {
  return Authentication.getApplicationInfo()
})

Platform.reqres.setHandler('get:user', function () {
  return Authentication.getUser()
})

Platform.reqres.setHandler('isAdmin', function (permissions) {
  return Authentication.getPermissions()
})*/


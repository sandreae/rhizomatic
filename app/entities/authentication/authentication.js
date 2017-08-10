import {gc} from '../../components/radio'
import {Globals} from './globals'

var user

var Authentication = {

  getKey: function() {
    return window.localStorage.getItem(Globals.auth.TOKEN_KEY);
  },

  isAuth: function(response) {
    window.localStorage.setItem(Globals.auth.TOKEN_KEY, response.token)
    window.localStorage.setItem(Globals.auth.USER_KEY, response._id)
  },

  isAdmin: function(permissions) {
    return (permissions === 'admin')
  },

  logoutUser: function() {
    window.localStorage.removeItem(Globals.auth.TOKEN_KEY)
    window.localStorage.removeItem(Globals.auth.USER_KEY)
    gc.request('user:init')
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


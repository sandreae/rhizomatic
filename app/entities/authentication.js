import {Globals} from './globals'
import {gc} from '../components/radio'

console.log(Platform)

var user
var applicationInfo
var permissions

var Authentication = {

  authenticated: function (response) {
    window.localStorage.setItem(Platform.Entities.Globals.auth.TOKEN_KEY, response.token)
    window.localStorage.setItem(Platform.Entities.Globals.auth.USER_KEY, response._id)
    Platform.request('initializeUser:entities')
    Platform.trigger('pubs:list')
    Platform.trigger('user:listpubs')
  },

  logout: function () {
    window.localStorage.removeItem(Platform.Entities.Globals.auth.TOKEN_KEY)
    window.localStorage.removeItem(Platform.Entities.Globals.auth.USER_KEY)
    user = null
    permissions = false
    Platform.trigger('updateUserInfo')
    Platform.trigger('pubs:list')
  },

  isAuthenticated: function () {
    return window.localStorage.getItem(Platform.Entities.Globals.auth.TOKEN_KEY)
  },

  initialize: function () {
    var d = $.Deferred()
    if (applicationInfo !== null) {
      d.resolve()
    } else {
      $.ajax({
        url: Platform.Entities.Globals.urls.APP_INFO,
        success: function (data) {
          applicationInfo = data
          d.resolve()
        },

        error: function () {
          console.log('get globals error')
        }
      })
    }
    return d.promise()
  },

  initializeUser: function () {
    var d = $.Deferred()
    if (Platform.request('isAuthenticated:entities') && !user) {
      user = new Platform.Entities.User({_id: window.localStorage.getItem(Platform.Entities.Globals.auth.USER_KEY)})
      user.fetch().success(function () {
        permissions = Platform.request('permissions:entities', user.get('permissions'))
        Platform.trigger('updateUserInfo')
        d.resolve()
      })
    } else {
      d.resolve()
    }
      return d.promise()
  },

  getApplicationInfo: function () {
    return applicationInfo
  },

  getUser: function () {
    return user || new Platform.Entities.User()
  },

  getPermissions: function () {
    return permissions
  }
}

Platform.reqres.setHandler('authenticated:entities', function (response) {
  return Authentication.authenticated(response)
})

Platform.reqres.setHandler('logout:entities', function () {
  return Authentication.logout()
})

Platform.reqres.setHandler('isAuthenticated:entities', function () {
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

Platform.reqres.setHandler('getPermissions:entities', function () {
  return Authentication.getPermissions()
})

export {Authentication, Globals}

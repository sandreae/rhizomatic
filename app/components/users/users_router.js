import {Authentication} from '../../entities/authentication/authentication'
import {gc} from '../radio'

export default Marionette.AppRouter.extend({
  appRoutes: {
    'users': 'listUsers',
    'users/:id/edit': 'editUser',
    'user/new': 'newUser',
    'user/profile': 'showProfile',
    'user/login': 'showLogin',
    'user/changepassword': 'showPassword',
  },

  execute: function(callback, args, name) {
  	console.log('user router')
    if (Authentication.getKey() === null) {
      gc.trigger('user:home')
      gc.trigger('pubs:list')
      console.log('route failed')
    } else {
      if (callback) callback.apply(this, args)
    }
  }
})

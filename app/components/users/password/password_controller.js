import Password from './views/password_view'
import {gc} from '../../radio'

var Controller = {
  showPassword: function() {
    gc.request('user:get', window.localStorage.userId).then(function(user){
      var password = new Password({})
      password.on('save:password', function(password){
        user.save({
    	  password: password
        },
        {
          success: function() {
          	console.log('password saved')
          	alert('password changed')
          	gc.trigger('user:home')
          }
        })
      })
      gc.trigger('sidebar:show', password)
    })
  }
}

export {Controller}
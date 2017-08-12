import Profile from './views/profile_view'
import {gc} from '../../radio'

var Controller = {
  showProfile: function() {
    gc.request('user:get', window.localStorage.userId).then(function(user){
      var profile = new Profile({
        model: user
      })
      gc.trigger('sidebar:show', profile)
    })
  }
}

export {Controller}

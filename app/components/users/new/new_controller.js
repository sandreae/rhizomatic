import {View} from './views/new_view'
import {gc} from '../../radio'

var Controller = {
    newUser: function (id) {
      var user = new Platform.Entities.Users.User()
      var newView = new View({model: user})

      newView.on('form:submit', function (data) {
        user.set({
          userName: data.userName,
          contributorNames: [data.userName],
          email: data.email,
          password: data.password,
          permissions: '',
          pendingPub: [],
          memberOf: data.memberOf
        })
        user.save(null, {
          success: function() {
            gc.trigger('user:showLogin')
          }
        })
      })
      gc.trigger('sidebar:show', newView)
    }
  }

export {Controller}
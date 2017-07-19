import {View} from './views/new_view'
import {gc} from '../../radio'

var Controller = {
    newUser: function (id) {
      var user = new Platform.Entities.Users.User()
      var newView = new View({model: user})

      newView.on('form:submit', function (data) {
        user.set({
          userName: data.userName,
          email: data.email,
          password: data.password,
          permissions: 'admin',
          pendingPub: 'false',
          memberOf: data.memberOf
        })
        user.save(null, {
          success: function () {
            gc.trigger('users:list')
          }
        })
      })
      Platform.Regions.getRegion('main').show(newView)
    }
  }

export {Controller}
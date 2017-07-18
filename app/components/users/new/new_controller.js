import {View} from './views/new_view'
import {gc} from '../../radio'

var Controller = {
    newUser: function (id) {
      var newView = new New.User()

      newView.on('form:submit', function (data) {
        var user = new Platform.Entities.User()
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
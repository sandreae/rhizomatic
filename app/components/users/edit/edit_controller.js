import {View} from './views/edit_view'
import {gc} from '../../radio'

var Controller = {
  editUser: function (id) {
    var fetchingUser = gc.request('user:get', id)
    $.when(fetchingUser).done(function (user) {

      var editView = new View({model: user})

      editView.on('form:submit', function (data) {
        user.set({
          userName: data.userName,
          email: data.email,
          password: data.password,
          permissions: ['admin']
        })
        user.save(null, {
          success: function () {
            gc.trigger('users:list')
          }
        })
      })
      Platform.Regions.getRegion('main').show(editView)
    })
  }
}

export {Controller}
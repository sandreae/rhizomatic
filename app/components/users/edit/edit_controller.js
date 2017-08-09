import {View} from './views/edit_view'
import {gc} from '../../radio'

var Controller = {
  editUser: function (id) {
    gc.request('user:get', id).then(function (user) {

      var editView = new View({model: user})

      editView.on('form:submit', function (data) {

        var globals = gc.request('globals:get')

        $.ajax({
            url: globals.urls.AUTHENTICATE,
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function(response) {
              if (response.success) {
                user.set({
                  userName: data.userName,
                  email: data.email,
                  permissions: data.permissions,
                  password: data.password
                })
                user.save(null, {
                  success: function () {
                    gc.trigger('user:home')
                    gc.trigger('user:list')
                  }
                })
              } else {
                  console.log(response)
              }
            }
        });
      })
      gc.trigger('sidebar:show', editView)
      gc.trigger('sidebar:open')
    })
  }
}

export {Controller}
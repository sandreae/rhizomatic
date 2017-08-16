import {View} from './views/login_view'
import {gc} from '../../radio'

var Controller = {
  showLogin: function(id){

    var loginView = new View()

    loginView.on('form:submit', function(data){
      var globals = gc.request('globals:get')
      $.ajax({
        url: globals.urls.AUTHENTICATE,
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function(response) {
          if (response.success) {
            gc.request('user:isAuthenticated', response)
            alertify.success('you are logged into Rhizomatic')
          } else {alertify.error(response.message)}
        }
      });
    })
    gc.trigger('sidebar:show:full', loginView)
  }
};

export {Controller}
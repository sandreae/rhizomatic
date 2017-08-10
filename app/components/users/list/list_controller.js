import {TableView} from './views/list_view'
import {gc} from '../../radio'

var Controller = {
  listUsers: function () {
    gc.request('users:get').then(function(users) {
      var listUsers = new TableView({
        collection: users
      })

      gc.trigger('sidebar:show', listUsers)
    })
  }
}

export {Controller}
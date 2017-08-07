import {TableView} from './views/list_view'
import {gc} from '../../radio'

var Controller = {
  listUsers: function () {
    var fetchingUsers = gc.request('users:get')
    $.when(fetchingUsers).done(function(users) {
      var listUsers = new TableView({
        collection: users
      })

      gc.trigger('sidebar:show', listUsers)
    })
  }
}

export {Controller}
import {TableView} from './views/list_view'
import {gc} from '../../radio'

var Controller = {
  listUsers: function () {
    var fetchingUsers = gc.request('users:get')
    $.when(fetchingUsers).done(function(users) {
      var listUsers = new TableView({
        collection: users
      })

      Platform.Regions.getRegion('main').show(listUsers)
      UserList.Controller.userListPubs()
    })
  }
}

export {Controller}
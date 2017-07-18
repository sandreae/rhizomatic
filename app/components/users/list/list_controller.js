import {ListView} from './views/list_view'
import {gc} from '../../radio'

var Controller = {
  listUsers: function () {
    var fetchingUsers = gc.request('users:get')
    $.when(fetchingUsers).done(function(users) {
      var listUsers = new ListView({
        collection: users
      })

      listUsers.on('childview:user:delete', function (childView, model) {
        model.destroy({wait: true}).done(function () {
          users.remove(model)
          childView.render()
        })
      })

      Platform.Regions.getRegion('main').show(listUsers)
    })
  }
}

export {Controller}
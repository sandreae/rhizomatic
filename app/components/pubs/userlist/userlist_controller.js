import {TableView} from './views/list_view'
import {gc} from '../../radio'

var Controller = {
  userListPubs: function() {
    if (gc.request('user:getCurrentUser')) {
      var fetchingpubs = gc.request('pubs:get')
      $.when(fetchingpubs).done(function (pubs) {
        var user = gc.request('user:getCurrentUser')
        var userPubs = new Backbone.Collection(pubs.filter(function (model) {
          return model.get('contributorId') === user.id
        }))
        var userPubsList = new TableView({
          collection: userPubs
        })
        gc.trigger('sidebar:show', userPubsList)
      })} else {
      gc.trigger('user:login')
    }
  },
}
export {Controller}
import {TableView} from './views/list_view'
import {gc} from '../../radio'

var Controller = {
  userListPubs: function() {
    gc.request('user:get', window.localStorage.userId).then(function(user) {
      gc.request('pubs:get').then(function(pubs) {
        var userPubs = new Backbone.Collection(pubs.filter(function(model) {
          return model.get('contributorId') === user.id
        }))
        var userPubsList = new TableView({
          collection: userPubs
        })
        gc.trigger('sidebar:show', userPubsList)
      })
    })
  },
}
export {Controller}

import {TableView} from './views/list_view'
import {gc} from '../../radio'

var Controller = {
  userListPubs: function () {
    var fetchingpubs = gc.request('pubs:get')

    $.when(fetchingpubs).done(function (pubs) {
      var user = gc.request('user:getCurrentUser')
      var userPubs = new Backbone.Collection(pubs.filter(function (model) {
        return model.get('contributorId') === user.id
      }))

      var userPubsList = new TableView({
        collection: userPubs
      })


      userPubsList.on('childview:pub:publish', function (childView) {
        var model = childView.model
        model.set({published: true})
        model.save(null, {
          success: function () {
            console.log('pub published')
            Controller.newInvitedPub(model)
          }
        })
      })
      gc.trigger('sidebar:show', userPubsList)
    })
  },

  newInvitedPub: function (model) {
    var invitedUsers = model.get('directedAt')
    var fetchingUsers = gc.request('users:get')
    $.when(fetchingUsers).done(function (users) {
      invitedUsers.forEach(function (userName) {
        var invitedUserModels = users.where({userName: userName})
        invitedUserModels.forEach(function (userModel) {
          var userId = userModel.get('_id')
          var newPub = new Platform.Entities.Pubs.PubModel({
            contributorId: userId,
            invitedBy: model.get('contributorId'),
            inRhizome: model.get('memberOf')
          })
          newPub.save(null, {
            success: function () {
              console.log('newPub created for ' + userName)
            }
          })
        })
      })
    })
  }
}
export {Controller}
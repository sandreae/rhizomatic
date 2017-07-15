Platform.module('PubsApp.UserList', function (UserList, Platform, Backbone, Marionette, $, _) {
// create controller object and attach 'UserlistPubs' sub-module//
// these these functions will be publicly available//
// they should coordinate models and views, typically triggered by URLs//

  UserList.Controller = {
    userListPubs: function () {
      var fetchingPubsCollection = Platform.request('pubsCollection:entities')

      $.when(fetchingPubsCollection).done(function (pubsCollection) {
        var user = Platform.request('getUser:entities')
        var userPubs = new Backbone.Collection(pubsCollection.filter(function (model) {
          return model.get('contributorId') === user.id
        }))
        var userPubsCompositeView = new UserList.UserPubsCompositeView({
          collection: userPubs
        })
        userPubsCompositeView.on('childview:pub:delete', function (childView, model) {
          pubsCollection.remove(model)
          model.destroy()
        })

        userPubsCompositeView.on('childview:pub:publish', function (childView, model) {
          model.set({published: true})
          model.save(null, {
            success: function () {
              console.log('pub published')
              UserList.Controller.newInvitedPub(model)
            }
          })
        })

        userPubsCompositeView.on('childview:pub:show', function (childView, model) {
        // trigger 'contact:show' when show button is clicked on ItemView//
        // the router reacts to this trigger by updating the URL and executing the appropriate controller action//
          Platform.trigger('pub:show', model.get('_id'))
        })

        userPubsCompositeView.on('childview:details:pub:edit', function (childView, model) {
          Platform.trigger('details:pub:edit', model.get('_id'))
        })

        userPubsCompositeView.on('childview:content:pub:edit', function (childView, model) {
          Platform.trigger('content:pub:edit', model.get('_id'))
        })

        userPubsCompositeView.on('pub:new', function () {
          Platform.trigger('details:pub:new')
        })
        Platform.regions.sidenav.show(userPubsCompositeView)
      })
    },

    newInvitedPub: function (model) {
      var invitedUsers = model.get('directedAt')
      var fetchingUsers = Platform.request('users:entities')
      $.when(fetchingUsers).done(function (users) {
        invitedUsers.forEach(function (userName) {
          var invitedUserModels = users.where({userName: userName})
          invitedUserModels.forEach(function (userModel) {
            var userId = userModel.get('_id')
            var newPub = new Platform.Entities.PubModel({
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
})

Platform.module('PubsApp.New', function(New, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication details//

  New.Controller = {
    newPubDetails: function () {
      var drafts = new Platform.Entities.Drafts()
      var newDraft = new Platform.Entities.Draft({
        content: 'draft content'
      })
      var newPub = new Platform.Entities.PubModel({})
      var newPubView = new Platform.PubsApp.Details.Pub({
        model: newPub
      })
      var user = Platform.request('getUser:entities')

    // request pubsCollection via API//
      var fetchingPubsCollection = Platform.request('pubsCollection:entities')

    // wait for request to complete//
      $.when(fetchingPubsCollection).done(function (pubsCollection) {
        newPubView.on('form:submit', function (data) {
          data.tags = data.tags.split(',')
          data.directedAt = data.directedAt.split(',')
          newPub.save(data, {
            success: function (pub, response) {
              newDraft.set({
                type: data.type,
                pub: pub.id
              })
              newPub.set({contributorId: user.get('_id')})
              drafts.add(newDraft)
              newPub.set({drafts: drafts})
              pubsCollection.add(newPub)
              newPub.save(null, {
                success: function () {
                  Platform.trigger('pub:show', pub.id)
                  Platform.trigger('user:listpubs')
                }
              })
            }
          })
        //  if(newPub.save(data)){
        //  console.log('new pub saved with id:' + newPub.get('_id'))
        //  pubsCollection.add(newPub)
        //  Platform.trigger('pub:show', newPub.get('id'))
        //  }
        })
        Platform.regions.sidenav.show(newPubView)
      })
    }
  }
})

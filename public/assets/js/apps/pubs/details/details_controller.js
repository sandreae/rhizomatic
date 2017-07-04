Platform.module('PubsApp.Details', function (Details, Platform, Backbone, Marionette, $, _) {
// this is the controller for editing publication details//

  Details.Controller = {
    editPubDetails: function (id) {
      // request the pub model via API handler using the 'id' argument passed from the router//
      var fetchingPubModel = Platform.request('pubModel:entities', id)
      $.when(fetchingPubModel).done(function (pubModel) {
        var newDraft = new Platform.Entities.Draft({
          content: 'draft content'
        })

        var editPubDetailsView = new Details.Pub({
          model: pubModel
        })

        // on 'form:submit' set pub details//
        editPubDetailsView.on('form:submit', function (data) {
          data.tags = data.tags.split(',')
          data.directedAt = data.directedAt.split(',')
          console.log(data)
          var drafts = pubModel.get('drafts')
          var draft = drafts.findWhere({type: data.type})
          if (draft === undefined) {
            newDraft.set({
              type: data.type,
              pub: pubModel.get('_id')

            })
            drafts.add(newDraft)
          } else {
            var content = draft.get('content')
          }

          pubModel.set({
            type: data.type,
            activeContent: content
          })

          pubModel.save(data, {
            success: function () {
              Platform.trigger('pubs:list')
            }
          })
        })

        Platform.regions.main.show(editPubDetailsView)
      })
    }
  }
})

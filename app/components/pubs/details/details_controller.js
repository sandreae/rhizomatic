import {View} from './views/details_view'
import {gc} from '../../radio'

var Controller = {
  editPubDetails: function(id) {
    var fetchingPubModel = gc.request('pub:get', id)
    $.when(fetchingPubModel).done(function (pubModel) {
      var newDraft = new Platform.Entities.Pubs.Draft({
        content: 'draft content'
      })

      var editPubDetailsView = new View({
        model: pubModel
      })

      // on 'form:submit' set pub details//
      editPubDetailsView.on('form:submit', function (data) {
        var content
        data.tags = data.tags.split(', ')
        data.directedAt = data.directedAt.split(', ')
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: data.type})

        if (draft === undefined) {
          newDraft.set({
            type: data.type,
            pub: pubModel.get('_id')

          })
          drafts.add(newDraft)
          content = ''
        } else {
          content = draft.get('content')
        }
        
        pubModel.set({
          type: data.type,
          activeContent: content
        })

        pubModel.save(data, {
          success: function () {
            console.log(data)
            gc.trigger('user:listPubs')
            gc.trigger('pubs:list')
          }
        })
      })

      Platform.Regions.getRegion('sidebar').show(editPubDetailsView)
    })
  }
}

export {Controller}
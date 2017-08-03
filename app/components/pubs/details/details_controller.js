import {View} from './views/details_view'
import {gc} from '../../radio'

var Controller = {
  editPubDetails: function(id) {
    var fetchingPub = gc.request('pub:get', id)
    $.when(fetchingPub).done(function (pub) {
      var newDraft = new Platform.Entities.Pubs.Draft({
        content: 'draft content'
      })

      var editPubDetailsView = new View({
        model: pub
      })

      // on 'form:submit' set pub details//
      editPubDetailsView.on('form:submit', function (data) {
        var content = ''
        var drafts = pub.get('drafts')
        var draft = drafts.findWhere({type: data.type})
        if (data.type === 'audio'){content = []}
        if (data.tags !== "") {data.tags = data.tags.split(', ')}
        if (data.directedAt !== "") { data.directedAt.split(', ')}

        if (draft === undefined) {
          newDraft.set({
            type: data.type,
            pub: pub.get('_id')

          })
          drafts.add(newDraft)
        } else {
          content = draft.get('content')
        }

        pub.set({
          type: data.type,
          activeContent: content
        })

        if (pub.save(data)) {
          gc.trigger('user:listPubs')
          gc.trigger('pub:content:edit', pub.get('_id'));
        } else {
          editPubDetailsView.triggerMethod('form:data:invalid', pub.validationError);
        }
      })

      gc.trigger('sidebar:show', editPubDetailsView)
    })
  }
}

export {Controller}
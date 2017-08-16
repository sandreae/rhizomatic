import {View} from './views/new_view'
import {gc} from '../../radio'

var Controller = {
  newPub: function (invitedByContrib, invitedByPubId) {

  var newPub = new Platform.Entities.Pubs.PubModel()
  var drafts = new Platform.Entities.Pubs.Drafts()
  var newDraft = new Platform.Entities.Pubs.Draft({
    content: 'draft content'
  })
  var newPubView = new View({
    model: newPub
  })
  var userID = window.localStorage.userId

    gc.request('pubs:get').then(function (pubsCollection) {
      newPubView.on('form:submit', function (data) {
        if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
        if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}

        if (newPub.save(data, {
          success: function() {console.log('newPub saved')}
        })) {
          newDraft.set({
            type: data.type,
            pub: newPub.get('_id'),
          })
          drafts.add(newDraft)
          newPub.set({
            contributorId: userID,
            drafts: drafts,
            invitedByPubId: invitedByPubId
          })
          pubsCollection.add(newPub)
          newPub.save(null, {
            success: function() {
              console.log('newPub saved 2')
            }
          }).then(function() {
            console.log('get pub')
            gc.trigger('sidebar:close')
            gc.trigger('pub:content:edit', newPub.get('_id'))
          })
        } else {
          newPubView.triggerMethod('form:data:invalid', newPub.validationError);
        }
      })
      gc.trigger('sidebar:show', newPubView)
    })
  }

}

export {Controller}

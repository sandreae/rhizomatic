import {View} from './views/new_view'
import newPubSave from './helpers/newPubSave'
import {gc} from '../../radio'

var Controller = {
  newPub: function () {

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
        if (data.type === 'audio' || 'image') {
          newDraft.set({content: []})
          newPub.set({activeContent: []})
        }
        newPub.save(data, {
          success: function(pub, response) {
            newDraft.set({
              type: data.type,
              pub: pub.id
            })
            drafts.add(newDraft)
            newPub.set({
              contributorId: userID,
              drafts: drafts})
            pubsCollection.add(newPub)
            newPub.save(null, {
              success: function () {
                console.log(newPub)
                gc.trigger('sidebar:close')
                gc.trigger('pub:content:edit', pub.id)
              }
            })
          },
        })
        newPubView.triggerMethod('form:data:invalid', newPub.validationError);
      })

      gc.trigger('sidebar:show', newPubView)
    })
  }

}

export {Controller}

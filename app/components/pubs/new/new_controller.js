import {View} from './views/new_view'
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

    var fetchingPubsCollection = gc.request('pubs:get')
    $.when(fetchingPubsCollection).done(function (pubsCollection) {
      newPubView.on('form:submit', function (data) {
        if (data.type === 'audio') {
          newDraft.set({content: []})
          newPub.set({activeContent: []})
        }
        console.log(newPub)
        if (newPub.save(data, {
          success: function (pub, response) {
            newDraft.set({
              type: data.type,
              pub: pub.id
            })
            newPub.set({contributorId: userID})
            drafts.add(newDraft)
            newPub.set({drafts: drafts})
            pubsCollection.add(newPub)
            newPub.save(null, {
              success: function () {
                gc.trigger('pub:content:edit', pub.id)
              }
            })
          },
        })) {console.log('sucess')} else {
          newPubView.triggerMethod('form:data:invalid', newPub.validationError);
        }
      //  if(newPub.save(data)){
      //  console.log('new pub saved with id:' + newPub.get('_id'))
      //  pubsCollection.add(newPub)
      //  Platform.trigger('pub:show', newPub.get('id'))
      //  }
      })
      gc.trigger('sidebar:show', newPubView)
    })
  }

}

export {Controller}

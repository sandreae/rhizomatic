import {View} from './views/new_view'
import {drafts, newDraft, newPub} from './helpers/new_pub'
import {gc} from '../../radio'

var Controller = {
  newPub: function () {

  var newPubView = new View({
    model: newPub
  })

  // request pubsCollection via API//
    var fetchingPubsCollection = gc.request('pubs:get')
  // wait for request to complete//

    $.when(fetchingPubsCollection).done(function (pubsCollection) {
      newPubView.on('form:submit', function (data) {
        var user = gc.request('user:getCurrentUser')
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
                gc.trigger('pub:show', pub.id)
                gc.trigger('user:listPubs')
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
      Platform.Regions.getRegion('sidebar').show(newPubView)
    })
  }
}

export {Controller}

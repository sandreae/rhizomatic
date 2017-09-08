import {View} from './views/new_view'
import {gc} from '../../radio'

var Controller = {
  newPub: function (invitedByContrib, invitedByPubId, user, invites, invite, rhizome, rhizomeName) {
  if (invitedByContrib === "" || invitedByContrib === null) {invitedByContrib = 'seed pub'}

  var newPub = new Platform.Entities.Pubs.PubModel()
  var drafts = new Platform.Entities.Pubs.Drafts()
  var newDraft = new Platform.Entities.Pubs.Draft({
    content: ''
  })
  var newPubView = new View({
    model: newPub
  })
  var userID = window.localStorage.userId


    gc.request('pubs:get').then(function (pubsCollection) {
        newPubView.on('form:submit', function (data) {
          if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
          if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}

          if (!newPub.save(data, {
            success: function(pub) {
              if (user !== undefined && user !== null) {
                invites.remove(invite)
                user.save({pendingPub: invites.toJSON()})
              }

              if (invitedByPubId === "" || invitedByPubId === null) {invitedByPubId = newPub.get('_id')}
                                    
              newDraft.set({
                type: data.type,
                pub: newPub.get('_id'),
              })
              drafts.add(newDraft)
              newPub.set({
                contributorId: userID,
                drafts: drafts,
                invitedByPubId: invitedByPubId,
                inRhizome: rhizomeName,

              })
              newPub.save(data, {
                success: function() {
                  gc.trigger('sidebar:close')
                  gc.trigger('pub:content:edit', newPub.get('_id'))
                }
              })
            }
          })) {newPubView.triggerMethod('form:data:invalid', newPub.validationError);}
        })
        gc.trigger('sidebar:show', newPubView)
    })
  }
}

export {Controller}

import {TableView} from './views/list_view'
import {gc} from '../../radio'

var Controller = {
  listInvites: function() {
    gc.request('user:get', window.localStorage.userId).then(function(user) {
      var userInvites = user.get('pendingPub')
      var invites = gc.request('invites:get', userInvites)
      var invitesView = new TableView({
        collection: invites,
        childViewEventPrefix: 'childview'
      })

      invitesView.on('childview:reject:invite', function(invite) {
      	console.log('controller reveived trigger reject:invite')
        invites.remove(invite)
        user.save({pendingPub: invites.toJSON()})
      })

      invitesView.on('childview:accept:invite', function(invite) {
      	console.log(invite)
      	console.log('controller reveived trigger accept:invite')
      	gc.trigger('pub:new', invite.get('invitedByContrib'), invite.get('invitedByPubId'), user, invites, invite, null, invite.get('inRhizome'))
      })

      gc.trigger('sidebar:show', invitesView)
    })
  },
}
export {Controller}

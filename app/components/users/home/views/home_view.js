import template from '../templates/home.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: template,

  events: {
    'click a.js-publications': 'publicationsClicked',
    'click a.js-invites': 'invitesClicked',
    'click a.js-profile': 'profileClicked',
    'click a.js-newrhizome': 'newRhizomeClicked'
  },

  publicationsClicked: function(e) {
    e.preventDefault()
    gc.trigger('user:listPubs')
  },

  invitesClicked: function(e) {
    e.preventDefault()
    gc.trigger('user:listInvites')
  },

  profileClicked: function(e) {
    e.preventDefault()
    gc.trigger('user:profile')
  },
  newRhizomeClicked: function(e) {
    e.preventDefault()
    gc.trigger('newRhizome:show')
  },
})

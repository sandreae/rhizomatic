import template from '../templates/home.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: template,

  events: {
    'click a.js-publications': 'publicationsClicked',
    'click a.js-profile': 'profileClicked'
  },

  publicationsClicked: function(e) {
    e.preventDefault()
    gc.trigger('user:listPubs')
  },

  profileClicked: function(e) {
    e.preventDefault()
    gc.trigger('user:edit')
  },
})

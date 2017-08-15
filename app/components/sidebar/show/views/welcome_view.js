import template from '../templates/welcome_message.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: template,

  events: {
    'click button.js-login': 'loginClicked',
    'click button.js-new-user': 'newClicked'
  },

  loginClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('user:showLogin')
  },

  newClicked: function(e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('user:new')
  },
})

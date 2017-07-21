import template from '../templates/login_message.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: template,

  events: {
    'click button.js-login': 'loginClicked',
    'click button.js-new-user': 'newClicked'
  },

  loginClicked: function (e) {
    e.stopPropagation()
    gc.trigger('user:showLogin')
  },

  newClicked: function(e) {
    e.preventDefault()
    gc.trigger('user:new')
  },

})

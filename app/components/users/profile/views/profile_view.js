import template from '../templates/template.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: template,

  events: {
    'click button.js-change-password': 'changePasswordClicked'
  },

  changePasswordClicked: function(e) {
    e.preventDefault()
    gc.trigger('user:password')
  }
})

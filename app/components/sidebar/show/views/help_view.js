import template from '../templates/help.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: template,

  ui: {
    helpClicked: '#js-help',
  },

  events: {
    'click @ui.helpClicked': 'helpClicked',
  },

  helpClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('help clicked')
    gc.trigger('howto:show')
    gc.trigger('sidebar:close')
  },
})

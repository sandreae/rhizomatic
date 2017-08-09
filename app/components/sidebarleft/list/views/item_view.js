import template from '../templates/item.jst'  
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: template,
  tagName: 'li',

  events: {
    'click a.nav-link': 'navigate',
  },

  modelEvents: {
  'change': function() {
    }
  },

  navigate: function(e) {
    e.preventDefault()
    var model = this.model
    var trigger = model.get('navigationTrigger')
    gc.trigger('sidebar:close')
    gc.trigger('sidebarleft:close')
    gc.trigger(trigger)}
})

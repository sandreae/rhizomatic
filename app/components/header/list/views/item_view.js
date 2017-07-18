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
    console.log('model in collection was changed');
    }
  },

  navigate: function(e) {
    e.preventDefault()
    var model = this.model
    var trigger = model.get('navigationTrigger')
    console.log(model)
    gc.trigger(trigger)},
})

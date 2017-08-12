import template from '../templates/template.jst'
import {gc} from '../../../radio'
import 'backbone.syphon'

export default Marionette.View.extend({
  template: template,

  events: {
    'click button.js-save': 'savePasswordClicked'
  },

  savePasswordClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    if (data.password1 === data.password2){
    	this.trigger('save:password', data.password1)
    } else {alert('passwords must match')}
  }
})

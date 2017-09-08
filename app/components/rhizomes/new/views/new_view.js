import template from '../templates/new_rhizome.jst'
import 'backbone.syphon'
import {gc} from '../../../radio'

var View = Marionette.View.extend({
  template: template,

  events: {
  	'click button.js-create': 'createClicked'
  },

  createClicked: function(e) {
    e.preventDefault();
    gc.trigger('pub:new', null, null, null, null, null, null, null)
  },
});

export {View}

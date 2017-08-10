import template from './../../../../entities/behaviors/templates/details.jst'
import 'backbone.syphon'
import {gc} from '../../../radio'

var View = Marionette.View.extend({
  template: template,

  events: {
	  'click button.js-submit': 'submitClicked'
  },

  behaviors: {
    validate: Platform.Behaviors.FormValidate,
    tagsautocomplete: Platform.Behaviors.TagsAutocomplete,
    atautocomplete: Platform.Behaviors.AtAutocomplete,
    namesautocomplete: Platform.Behaviors.NamesAutocomplete,
  },

  onDomRefresh: function() {
    this.triggerMethod('tagsautocomplete', [])
    this.triggerMethod('atautocomplete', [])
    this.triggerMethod('namesautocomplete', null)
  },

  submitClicked: function(e) {
    e.preventDefault();
    //serialize the form data//
    var data = Backbone.Syphon.serialize(this);
    this.trigger('form:submit', data);
  },
});

export {View}

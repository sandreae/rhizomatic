import template from './../../../../entities/behaviors/templates/details.jst'
import 'backbone.syphon'

var View = Marionette.View.extend({
  template: template,

  events: {
	'click button.js-submit': 'submitClicked'
  },

  behaviors: {
    validate: Platform.Behaviors.FormValidate,
    tagsautocomplete: Platform.Behaviors.TagsAutocomplete,
    atautocomplete: Platform.Behaviors.AtAutocomplete,
  },

  onDomRefresh: function() {
    this.triggerMethod('tagsautocomplete', [])
    this.triggerMethod('atautocomplete', [])
  },

  submitClicked: function(e){
	e.preventDefault();
	//serialize the form data//
	var data = Backbone.Syphon.serialize(this);
	this.trigger('form:submit', data);
  },
});

export {View}
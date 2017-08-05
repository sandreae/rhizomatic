import template from './../templates/new.jst'
import 'backbone.syphon'

var View = Marionette.View.extend({
  template: template,

  events: {
	'click button.js-submit': 'submitClicked'
  },

  behaviors: {
    validate: Platform.Behaviours.FormValidate,
    tagsautocomplete: Platform.Behaviours.TagsAutocomplete,
    atautocomplete: Platform.Behaviours.AtAutocomplete,
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
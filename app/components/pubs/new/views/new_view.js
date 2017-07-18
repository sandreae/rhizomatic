import template from './../../details/templates/details.jst'
import 'backbone.syphon'

var View = Marionette.View.extend({
  template: template,

  events: {
	'click button.js-submit': 'submitClicked'
  },

  submitClicked: function(e){
	e.preventDefault();
	//serialize the form data//
	var data = Backbone.Syphon.serialize(this);
	this.trigger('form:submit', data);
	console.log(data)
  }
});

export {View}
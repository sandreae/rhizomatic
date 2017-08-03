import template from './../templates/new.jst'
import 'backbone.syphon'

var View = Marionette.View.extend({
  template: template,

  events: {
	'click button.js-submit': 'submitClicked'
  },

  behaviors: {
    validate: Platform.Behaviours.FormValidate,
    autocomplete: Platform.Behaviours.Autocomplete,
  },


  onDomRefresh: function() {
    console.log('date picker shown')
    $("#pub-pubDate").datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });
    this.triggerMethod('autocomplete')
  },

  submitClicked: function(e){
	e.preventDefault();
	//serialize the form data//
	var data = Backbone.Syphon.serialize(this);
	console.log(data)
	this.trigger('form:submit', data);
  },
});

export {View}
import template from './..//templates/details.jst'
import 'backbone.syphon'
import 'jquery-ui'
import 'backbone-forms'

var View = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked'
  },

  onDomRefresh: function() {
    console.log('date picker shown')
    $("#pub-pubDate").datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });
  },

  submitClicked: function (e) {
    e.preventDefault()
    // serialize the form data//
    var data = Backbone.Syphon.serialize(this)
    this.trigger('form:submit', data)
  }
})

export {View}
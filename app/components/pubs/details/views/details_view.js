import template from './..//templates/details.jst'
import {gc} from '../../../radio'
import 'backbone.syphon'
import 'jquery-ui'

var View = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked'
  },

  behaviors: {
    validate: Platform.Behaviors.FormValidate,
    autocomplete: Platform.Behaviors.Autocomplete,
  },

  onDomRefresh: function() {
    $("#pub-pubDate").datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });
  },

  submitClicked: function (e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
    },
})

export {View}
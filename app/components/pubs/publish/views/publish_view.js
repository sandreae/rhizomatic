import template from './..//templates/publish.jst'
import 'backbone.syphon'
import 'jquery-ui'

var View = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked'
  },

  behaviors: {
    validate: Platform.Behaviours.FormValidate,
  },

  submitClicked: function (e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
    },
})

export {View}
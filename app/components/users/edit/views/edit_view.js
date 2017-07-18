import template from '../templates/edit.jst'
import 'backbone.syphon'

var View = Marionette.View.extend({

  template: template,

  events: {
    "click button.js-submit": "submitClicked"
  },

  submitClicked: function(e){
    e.preventDefault();
    var data = Backbone.Syphon.serialize(this);
    this.trigger("form:submit", data);
  }
});

export {View}
import template from '../templates/edit.jst'
import 'backbone.syphon'
import * as Validation from 'backbone-validation';

var View = Marionette.View.extend({

  template: template,

  events: {
    "click button.js-submit": "submitClicked"
  },

  modelEvents: {
    'validated': 'setValidated',
  },

  onRender: function() {
    //any other post-render View code here

    Validation.bind(this);
    if(this.validated) {
        this.model.validate();
    }
  },

  setValidated: function() {
    this.validated = true;
  },

  submitClicked: function(e){
    e.preventDefault();
    var data = Backbone.Syphon.serialize(this);
    this.trigger("form:submit", data);
  }
});

export {View}
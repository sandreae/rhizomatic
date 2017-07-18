import template from '../templates/login.jst'
import 'backbone.syphon'

var View = Marionette.View.extend({

  template: template,

  events: {
  'click button.js-login': 'login'
  },

  login: function (e) {
    e.preventDefault();
    var data = Backbone.Syphon.serialize(this);
    this.$('.alert').hide();
    this.trigger('form:submit', data)
  }
})

export {View}
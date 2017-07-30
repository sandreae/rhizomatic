import template from '../templates/script_sidebar.jst'

var ScriptSidebar = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked'
  },

  behaviors: {
    validate: Platform.Behaviours.FormValidate,
  },

  submitClicked: function(e) {
    e.preventDefault()
    var content = 'url here'
    var data = Backbone.Syphon.serialize(this);
    this.trigger('form:submit', content, data, this.model)

    //nvar data = Backbone.Syphon.serialize(this);
    //  this.trigger('form:submit', data);
  },

  publishClicked: function(e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },
})

export {ScriptSidebar}
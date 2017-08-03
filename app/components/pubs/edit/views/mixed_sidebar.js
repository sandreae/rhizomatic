import template from '../templates/mixed_sidebar.jst'

var MixedSidebar = Marionette.View.extend({

  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked'
  },

  behaviors: {
    validate: Platform.Behaviours.FormValidate,
    autocomplete: Platform.Behaviours.Autocomplete,
  },

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var simplemde = $('#simplemde').data('editor')
    var content = simplemde.value()
    this.trigger('form:submit', content, data, this.model)

    //nvar data = Backbone.Syphon.serialize(this);
    //  this.trigger('form:submit', data);
  },

  publishClicked: function(e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },
})

export {MixedSidebar}

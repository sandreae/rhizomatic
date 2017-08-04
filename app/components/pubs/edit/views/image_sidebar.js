import template from '../templates/edit_sidebar.jst'
import 'jquery-ui'

var ImageSidebar = Marionette.View.extend({
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
    var drafts = this.model.get('drafts')
    var draft = drafts.findWhere({type: 'image'})
    var content = draft.get('content')
    this.trigger('form:submit', content, data, this.model)
  },

  publishClicked: function(e) {
    e.preventDefault()
    this.model.set({published: true})
    this.submitClicked(e)
  },
})
export {ImageSidebar}

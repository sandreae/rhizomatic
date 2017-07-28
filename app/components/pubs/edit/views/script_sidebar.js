import template from '../templates/script_sidebar.jst'

var ScriptSidebar = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
      'click button.js-publish': 'publishClicked'

  },

  submitClicked: function (e) {
    e.preventDefault()
      this.trigger('form:submit', content, data, this.model)

    },

  
  publishClicked: function (e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },
})

export {ScriptSidebar}
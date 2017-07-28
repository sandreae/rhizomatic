import template from '../templates/script_sidebar.jst'

var ScriptSidebar = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked'
  },

  submitClicked: function (e) {
    e.preventDefault()
      this.trigger('form:submit', content)
    },
})

export {ScriptSidebar}
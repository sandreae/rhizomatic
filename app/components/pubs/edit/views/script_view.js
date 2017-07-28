import template from '../templates/script.jst'

  var Script = Marionette.View.extend({
    template: template,

    events: {
      'click button.js-submit': 'submitClicked'
    },

    submitClicked: function (e) {
      this.trigger('form:submit', content)
    },
  })
export {Script}

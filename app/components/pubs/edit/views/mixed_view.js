import template from '../templates/mixed.jst'
import SimpleMDE from 'simplemde'

var Mixed = Marionette.View.extend({
    template: template,

    events: {
      'click button.js-submit': 'submitClicked'
    },

    onAttach: function () {
      var element = $('#simplemde').get(0)
      var editor = new SimpleMDE({element: element})
      $('#simplemde').data({editor: editor})
    },
  })

export {Mixed}

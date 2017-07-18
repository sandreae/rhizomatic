import template from '../templates/mixed.jst'
import SimpleMDE from 'simplemde'
var Mixed = Marionette.View.extend({
    template: template,

    events: {
      'click button.js-submit': 'submitClicked'
    },

    onAttach: function () {
      var element = $('#simplemde').get(0)
      console.log(element)
      var editor = new SimpleMDE({element: element})
      $('#simplemde').data({editor: editor})
    },

    submitClicked: function (e) {
      e.preventDefault()
      // serialize the form data//
      var simplemde = $("#simplemde").data('editor')
      var content = simplemde.value()
      var renderedHTML = simplemde.options.previewRender(content)
      this.trigger('form:submit', content)

      //this.trigger('form:submit', content)
    }
  })

export {Mixed}

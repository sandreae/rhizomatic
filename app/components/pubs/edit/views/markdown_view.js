import template from '../templates/markdown.jst'
import SimpleMDE from 'simplemde'

var Markdown = Marionette.View.extend({
    template: template,

    onAttach: function () {
      var element = $('#simplemde').get(0)
      var editor = new SimpleMDE({element: element})
      $('#simplemde').data({editor: editor})
    },
  })

export {Markdown}

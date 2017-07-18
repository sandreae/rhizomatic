import template from '../templates/script.jst'
import CodeMirror from 'codemirror'

  var Script = Marionette.View.extend({
    template: template,

    events: {
      'click button.js-submit': 'submitClicked'
    },

    submitClicked: function (e) {
      e.preventDefault()
      // serialize the form data//
      var editor = $('.CodeMirror')[0].CodeMirror
      var content = editor.getValue()
      this.trigger('form:submit', content)
    },

    onAttach: function () {
      var thisModel = this.model
      var myTextArea = this.$('#myTextArea').get(0)
      var editor = CodeMirror(function (elt) {
        myTextArea.parentNode.replaceChild(elt, myTextArea)
      },
        {
          theme: 'blackboard',
          mode: 'text/html',
          value: thisModel.get('activeContent')
        })

      editor.refresh()
    }
  })
export {Script}

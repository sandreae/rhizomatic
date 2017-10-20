import template from '../templates/code.jst'
require("codemirror/mode/javascript/javascript.js");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/blackboard.css");
require("codemirror/mode/css/css.js");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
var CodeMirror = require("codemirror");
window.CodeMirror = CodeMirror
require('jotted/jotted.css')
var Jotted = require("jotted")

var Code = Marionette.View.extend({
  className: 'code-container',
  template: template,

  events: {
    'change input.myUrl': 'urlChanged',
  },


  onAttach: function() {
    var html
    var css
    var js
    var drafts = this.model.get('drafts')
    var draft = drafts.findWhere({type: 'code'})
    var content = draft.get("content")
    if (content.code === undefined) {
      html = ""
      css = ""
      js = ""
    } else {
      html = content.code.html
      css = content.code.css
      js = content.code.js
    }

    $('#myCode').data('html', html)
    $('#myCode').data('css', css)
    $('#myCode').data('js', js)

    var jotted = new Jotted(document.querySelector('#myCode'), {
      files: [
        {
          type: 'html',
          content: html
        },
        {
          type: 'js',
          content: js
        },
        {
          type: 'css',
          content: css
        }
      ],
      plugins: [ 'codemirror', 'pen' ]
    });

    jotted.on('change', function (params, callback) {
      if (params.type === 'html') {$('#myCode').data('html', params.content)}
      if (params.type === 'css') {$('#myCode').data('css', params.content)}
      if (params.type === 'js') {$('#myCode').data('js', params.content)}
      console.log(params)
      callback(null, params)
    })
  },

  urlChanged: function(){
    var myUrl = $('#myUrl').val()
  },
})

export {Code}



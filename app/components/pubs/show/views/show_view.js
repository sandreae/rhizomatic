import missing from './../templates/missing.jst'
import markdown from './../templates/markdown.jst'
import collage from './../templates/collage.jst'
import script from './../templates/script.jst'
import audio from './../templates/audio.jst'
import image from './../templates/image.jst'
import video from './../templates/video.jst'
import code from './../templates/code.jst'
import showdown from 'showdown'
import {gc} from '../../../radio'
import SimpleMDE from 'simplemde'
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

export default Marionette.View.extend({
  tagName: 'span',

  getTemplate: function(){
    var type = this.model.get('type')
    var template
    if (type === 'markdown') {template = markdown}
    if (type === 'collage') {template = collage}
    if (type === 'url') {template = script}
    if (type === 'audio') {template = audio}
    if (type === 'image') {template = image}
    if (type === 'video') {template = video}
    if (type === 'code') {template = code}
    return template},

  initialize: function() {
    var model = this.model
        console.log(model.get('activeContent'))

    if (model.get('type') === 'markdown') {
      var content = model.get('activeContent')
      var converter = new showdown.Converter({
        'tables': true,
        'ghCodeBlocks': true,
        'tasklists': true,
        'ghMentions': true,
        'openLinksInNewWindow': true,
        'ghCodeBlocks': true,
      })
      var html = converter.makeHtml(content)
      model.set({activeContent: html})
    }
  },

  onAttach: function(){
    var model = this.model
    if (model.get('type') === 'collage') {

      var textareas = document.querySelectorAll('.textBox');
      [].forEach.call(textareas, function(textarea) {
      var converter = new showdown.Converter({
        'tables': true,
        'ghCodeBlocks': true,
        'tasklists': true,
        'ghMentions': true,
        'openLinksInNewWindow': true,
        'ghCodeBlocks': true,
        'simpleLineBreaks': true,
      })
      var html = converter.makeHtml(textarea.value)
      var div = document.createElement("div")
      div.className = 'text-show'
      div.innerHTML = html
      $( textarea).replaceWith(div);      
      });
    }

    if (model.get('type') === 'code') {
      var activeContent = model.get('activeContent')
      var html = activeContent.code.html
      var css = activeContent.code.css
      var js = activeContent.code.js
      new Jotted(document.querySelector('#myCode'), {
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
        pane: 'result',
        plugins: ['codemirror']
      });
    }
  },

  events: {
    'click a.js-url-link': 'linkClicked',
  },

  linkClicked: function(e) {
    e.preventdefault()
    console.log('link clicked')
  },
})

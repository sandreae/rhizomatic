import missing from './../templates/missing.jst'
import markdown from './../templates/markdown.jst'
import collage from './../templates/collage.jst'
import script from './../templates/script.jst'
import audio from './../templates/audio.jst'
import image from './../templates/image.jst'
import video from './../templates/video.jst'
import showdown from 'showdown'
import {gc} from '../../../radio'
import SimpleMDE from 'simplemde'

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
    return template},

  initialize: function() {
    var model = this.model
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

    if (model.get('type') === 'video') {

      var getId = function(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
      }
      var videoContent = model.get('activeContent')
      var myId;
      myId = getId(videoContent.url);
      var embed = '<iframe src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe>'
      videoContent.url = embed
      model.set({activeContent: videoContent})
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
  },

  events: {
    'click a.js-url-link': 'linkClicked',
  },

  linkClicked: function(e) {
    e.preventdefault()
    console.log('link clicked')
  },
})

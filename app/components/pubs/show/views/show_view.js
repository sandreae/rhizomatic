import missing from './../templates/missing.jst'
import markdown from './../templates/markdown.jst'
import collage from './../templates/collage.jst'
import script from './../templates/script.jst'
import audio from './../templates/audio.jst'
import image from './../templates/image.jst'
import showdown from 'showdown'
import {gc} from '../../../radio'

export default Marionette.View.extend({

  getTemplate: function(){
    var type = this.model.get('type')
    var template
    if (type === 'markdown') {template = markdown}
    if (type === 'collage') {template = collage}
    if (type === 'script') {template = script}
    if (type === 'audio') {template = audio}
    if (type === 'image') {template = image}
    return template},

  initialize: function() {
    var model = this.model
    if (model.get('type') === 'markdown') {
      var content = model.get('activeContent')
      var converter = new showdown.Converter()
      var html = converter.makeHtml(content)
      console.log(html)
      model.set({activeContent: html})
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

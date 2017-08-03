import missing from './../templates/missing.jst'
import markdown from './../templates/markdown.jst'
import collage from './../templates/collage.jst'
import script from './../templates/script.jst'
import audio from './../templates/audio.jst'
import showdown from 'showdown'
import {gc} from '../../../radio'

export default Marionette.View.extend({

  getTemplate: function(){
    var type = this.model.get('type')
    var template
    if (type === 'markdown'){template = markdown}
    if (type === 'collage'){template = collage}
    if (type === 'script'){template = script}
    if (type === 'audio'){template = audio}
    return template},

  initialize: function() {
    var model = this.model
    if (model.get('type') === 'markdown') {
      var content = model.get('activeContent')
      var converter = new showdown.Converter()
      var html = converter.makeHtml(content)
      model.set({activeContent: html})
    }
  },

  onAttach: function() {
    var self = this
    var model = this.model
    if (model.type === 'collage') {
    // self.$('.ui-draggable').draggable('disable');
    // self.$('.ui-resizable').resizable('disable');
    // self.$('.ui.resizable-handle').display = 'none'
    }
  }

})

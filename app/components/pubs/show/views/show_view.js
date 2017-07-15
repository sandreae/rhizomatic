import missing from './../templates/missing.jst'
import mixed from './../templates/mixed.jst'
import image from './../templates/image.jst'
import script from './../templates/script.jst'
import showdown from 'showdown'
import {gc} from '../../../radio'

var Pub = Marionette.View.extend({
  initialize: function() {

    var model = this.model

    if (model.get('type') === 'mixed') {
      var content = model.get('activeContent')
      var converter = new showdown.Converter()
      var html = converter.makeHtml(content)
      model.set({activeContent: html})
    }
  },

  template: image,

  events: {
    'click a.js-edit-details': 'editDetailsClicked',
    'click a.js-edit-content': 'editContentClicked'
  },

  editDetailsClicked: function(e) {
    e.preventDefault()
    Platform.trigger('details:pub:edit', this.model.get('_id'))
  },

  editContentClicked: function(e) {
    e.preventDefault()
    Platform.trigger('content:pub:edit', this.model.get('_id'), this.model.get('type'))
  },
})

export {Pub}
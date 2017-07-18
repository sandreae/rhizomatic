import missing from './../templates/missing.jst'
import mixed from './../templates/mixed.jst'
import image from './../templates/image.jst'
import script from './../templates/script.jst'
import showdown from 'showdown'
import {gc} from '../../../radio'

export default Marionette.View.extend({

  getTemplate: function(){
    var type = this.model.get('type')
    var template
    if (type === 'mixed'){template = mixed}
    if (type === 'image'){template = image}
    if (type === 'script'){template = script}
    return template},

  initialize: function() {
    var model = this.model
    if (model.get('type') === 'mixed') {
      var content = model.get('activeContent')
      var converter = new showdown.Converter()
      var html = converter.makeHtml(content)
      model.set({activeContent: html})
    }
  },
})

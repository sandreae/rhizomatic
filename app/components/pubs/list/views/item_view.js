import template from '../templates/item_template.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
tagName: 'tr',
template: template,

// when the views DOM element is clicked call 'highlightName'//

events: {
  'click a.js-show-pub': 'showClicked',
  'click a.js-delete-pub': 'deleteClicked'
},

showClicked: function (e) {
  e.preventDefault()
  e.stopPropagation()
  gc.trigger('pub:show', this.model.get('_id'))
},

deleteClicked: function (e) {
  e.preventDefault()
  e.stopPropagation()
  this.remove(this.model)
},

remove: function () {
  var self = this
  this.$el.fadeOut(function () {
     self.model.destroy()
  })
}
})


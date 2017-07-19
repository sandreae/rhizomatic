import template from '../templates/item.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  tagName: 'tr',
  template: template,

  events: {
    'click a.js-edit-user': 'editClicked',
    'click a.js-delete-user': 'deleteClicked'
  },

  deleteClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    this.remove(this.model)  
  },

  editClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('user:edit', this.model.get('_id'))
  },

  remove: function () {
    var self = this
    this.$el.fadeOut(function () {
    self.model.destroy()
    })
  }
})

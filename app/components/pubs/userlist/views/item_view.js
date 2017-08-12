import template from '../templates/item.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  tagName: 'tr',
  template: template,

  modelEvents: {
    'change': 'render'
  },
  // when the views DOM element is clicked call 'highlightName'//
  events: {
    'click a.js-show-pub': 'showClicked',
    'click a.js-delete-pub': 'deleteClicked',
    'click a.js-edit-details': 'editPubDetails',
    'click a.js-edit-content': 'editPubContent',
    'click a.js-publish': 'publishClicked'

  },

  deleteClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    var answer = confirm('Do you want to delete?')
    if (answer) {
      this.remove()
      this.model.destroy()
      alert('Deleted')
    }
    else {
      alert('Not Deleted')
    }
  },

  showClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('pub:show', this.model.get('_id'))
  },

  editPubContent: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('pub:content:edit', this.model.get('_id'))
  },

  remove: function () {
    var self = this
    this.$el.fadeOut(function () {
      Marionette.View.prototype.remove.call(self)
    })
  },

})

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
    // stops the 'click' event bubbling up to parent elements//
    e.stopPropagation()
    var answer = confirm('Do you want to delete?')
    if (answer) {
      this.trigger('pub:delete', this.model)
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
    this.trigger('pub:show', this.model)
    gc.trigger('pub:show', this.model.get('_id'))

  },

  editPubDetails: function (e) {
    e.preventDefault()
    e.stopPropagation()
    this.trigger('pub:details:edit', this.model)
    gc.trigger('pub:details:edit', this.model.get('_id'))
  },

  editPubContent: function (e) {
    e.preventDefault()
    e.stopPropagation()
    this.trigger('pub:content:edit', this.model)
    gc.trigger('pub:content:edit', this.model.get('_id'))
  },

  publishClicked: function (e) {
    e.preventDefault()
    console.log('published clicked')
    gc.trigger('pub:publish', this.model.get('_id'))
  },

  remove: function () {
    var self = this
    // fadeOut ItemView when deleted by accessing the 'remove' lifecycle event//
    this.$el.fadeOut(function () {
      // once the fadeOut has finished, scope out the original 'remove' function using 'prototype'
      // and call it on 'this' to remove the model and clear up any dependencies//
      Marionette.View.prototype.remove.call(self)
    })
  },

})

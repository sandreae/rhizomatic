import template from '../templates/item.jst'

export default Marionette.View.extend({
  tagName: 'tr',
  template: template,

  events: {
    'click': 'highlightName',
    'click a.js-edit-user': 'editClicked',
    'click a.js-delete-user': 'deleteClicked'
  },

  highlightName: function () {
    this.$el.toggleClass('warning')
  },

  deleteClicked: function (e) {
    e.stopPropagation()
    this.trigger('user:delete', this.model)
  },

  editClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    this.trigger('user:edit', this.model)
  },

  remove: function () {
    var self = this
    this.$el.fadeOut(function () {
    Marionette.View.prototype.remove.call(self)
    })
  }
})
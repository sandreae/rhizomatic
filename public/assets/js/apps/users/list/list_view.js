Platform.module('UsersApp.List', function (List, Platform, Backbone, Marionette, $, _) {

  List.UserItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#user-list-item',

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
      console.log('edit clicked')
      this.trigger('user:edit', this.model)
    },

    remove: function () {
      var self = this
      this.$el.fadeOut(function () {
        Marionette.ItemView.prototype.remove.call(self)
      })
    }

  })

  List.UsersCompositeView = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table table-hover',
    template: '#users-list',
    childView: List.UserItemView,
    childViewContainer: 'tbody',
    events: {
      'click button.js-new-user': 'newClicked'
    },

    newClicked: function (e) {
      e.preventDefault()
      this.trigger('user:new')
    }
  })
})

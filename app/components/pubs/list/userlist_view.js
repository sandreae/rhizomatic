Platform.module('PubsApp.UserList', function (UserList, Platform, Backbone, Marionette, $, _) {
// define pub list item view//

  UserList.UserPubItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#userpubs-list-item',

    // when the views DOM element is clicked call 'highlightName'//

    modelEvents: {
      'change': 'render'
    },

    events: {
      'click': 'highlightName',
      'click a.js-show-pub': 'showClicked',
      'click a.js-delete-pub': 'deleteClicked',
      'click a.js-edit-details': 'editPubDetails',
      'click a.js-edit-content': 'editPubContent',
      'click a.js-publish': 'publishClicked'
    },

    // using e.target gives us the DOM element that triggered this event function//
    // wrapping it in $() turns it into a jQuery object//
    // console.log($(e.target).text())

    // this.$el returns a jQuery object wrapping the views DOM element//
    // in this case, that is <tr>//
    // this event function should be in the 'view' because it changes the display, not data//

    highlightName: function () {
      this.$el.toggleClass('warning')
    },

    deleteClicked: function (e) {
      // stops the 'click' event bubbling up to parent elements//
      e.stopPropagation()
      this.trigger('pub:delete', this.model)
    },

    showClicked: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.trigger('pub:show', this.model)
    },

    editPubDetails: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.trigger('details:pub:edit', this.model)
      // this.trigger('pub:user:view', this.model)
    },

    editPubContent: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.trigger('content:pub:edit', this.model)
      // this.trigger('pub:user:view', this.model)
    },

    publishClicked: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.trigger('pub:publish', this.model)
      // this.trigger('pub:user:view', this.model)
    },

    remove: function () {
      var self = this
      // fadeOut ItemView when deleted by accessing the 'remove' lifecycle event//
      this.$el.fadeOut(function () {
        // once the fadeOut has finished, scope out the original 'remove' function using 'prototype'
        // and call it on 'this' to remove the model and clear up any dependencies//
        Marionette.ItemView.prototype.remove.call(self)
      })
    }
  })

  // define Composite View//
  // a Composite View is the same as a Collection except it can have a wrapper template for the generated list//

  UserList.UserPubsCompositeView = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table table-hover',
    template: '#userpubs-list',
    childView: UserList.UserPubItemView,
    childViewContainer: 'tbody',
    events: {
      'click button.js-new-pub': 'newClicked'
    },

    templateContext: {
      model: '100'
    },
    newClicked: function (e) {
      e.preventDefault()
      this.trigger('pub:new')
    }
  })
})

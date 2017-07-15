Platform.module('PubsApp.List', function (List, Platform, Backbone, Marionette, $, _) {
// define pub list item view//

  List.PubItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#pub-list-item',

    // when the views DOM element is clicked call 'highlightName'//

    events: {
      'click a.js-show-pub': 'showClicked',
      'click a.js-delete-pub': 'deleteClicked'
    },

    showClicked: function (e) {
      e.preventDefault()
      e.stopPropagation()
      this.trigger('pub:show', this.model)
    },

    deleteClicked: function (e) {
      // stops the 'click' event bubbling up to parent elements//
      e.stopPropagation()
      this.trigger('pub:delete', this.model)
    },

    remove: function () {
      var self = this
      this.$el.fadeOut(function () {
        Marionette.ItemView.prototype.remove.call(self)
      })
    }
  })

  // define Composite View//
  // a Composite View is the same as a Collection except it can have a wrapper template for the generated list//

  List.PubsCompositeView = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table table-hover',
    template: '#pubs-list',
    childView: List.PubItemView,
    childViewContainer: 'tbody',
    templateContext: {
      model: '100'
    }
  })
})

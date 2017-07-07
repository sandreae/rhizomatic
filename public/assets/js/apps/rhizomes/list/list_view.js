Platform.module('RhizomesApp.List', function (List, Platform, Backbone, Marionette, $, _) {

  List.RhizomeItemView = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#rhizome-list-item',

    events: {
      'click a.js-delete-rhizome': 'deleteClicked',
    },

    deleteClicked: function (e) {
      e.stopPropagation()
      this.trigger('rhizome:delete', this.model)
    },

    remove: function () {
      var self = this
      this.$el.fadeOut(function () {
        Marionette.ItemView.prototype.remove.call(self)
      })
    }

  })

  List.RhizomesCompositeView = Marionette.CompositeView.extend({
    tagName: 'table',
    className: 'table table-hover',
    template: '#rhizomes-list',
    childView: List.RhizomeItemView,
    childViewContainer: 'tbody',
    events: {
      'click button.js-new-rhizome': 'newClicked'
    },

    newClicked: function (e) {
      e.preventDefault()
      this.trigger('rhizome:new')
    }
  })
})

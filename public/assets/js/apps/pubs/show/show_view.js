Platform.module('PubsApp.Show', function (Show, Platform, Backbone, Marionette, $, _) {
// this is the view for individual publications//

  Show.MissingPub = Marionette.ItemView.extend({
    template: '#missing-pub-view'
  })

  Show.Pub = Marionette.ItemView.extend({
    serializeData: function () {
      var ownerTest
      var model = this.model
      var author = this.model.get('contributorId')
      var user = Platform.request('getUser:entities')
      if (user !== undefined) { ownerTest = (author === user.attributes._id) } else { ownerTest = false }

      return {
        _id: model.get('_id'),
        contributor: model.get('contributor'),
        title: model.get('title'),
        type: model.get('type'),
        pubDate: model.get('pubDate'),
        activeContent: model.get('activeContent'),
        isOwner: ownerTest
      }
    },

    events: {
      'click a.js-edit-details': 'editDetailsClicked',
      'click a.js-edit-content': 'editContentClicked'
    },

    editDetailsClicked: function (e) {
      e.preventDefault()
      this.trigger('details:pub:edit', this.model)
    },

    editContentClicked: function (e) {
      e.preventDefault()
      var type = this.model.get('type')
      this.trigger('content:pub:edit', this.model, type)
    }
  })
})

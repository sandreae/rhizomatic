Platform.module('PubsApp.List', function (List, Platform, Backbone, Marionette, $, _) {
// create controller object and attach 'listPubs' sub-module//
// these these functions will be publicly available//
// they should coordinate models and views, typically triggered by URLs//

  List.Controller = {
    listPubs: function () {
      var fetchingPubsCollection = Platform.request('pubsCollection:entities')

      $.when(fetchingPubsCollection).done(function (pubsCollection) {
        var pubsCompositeView = new List.PubsCompositeView({
          collection: pubsCollection
        })

        pubsCompositeView.on('childview:pub:show', function (childView, model) {
          Platform.trigger('pub:show', model.get('_id'))
        })

        pubsCompositeView.on('childview:pub:delete', function (childView, model) {
          pubsCollection.remove(model)
          model.destroy()
        })
        Platform.regions.main.show(pubsCompositeView)
      })
    }
  }
})

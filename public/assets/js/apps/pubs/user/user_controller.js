Platform.module('PubsApp.UserView', function (UserView, Platform, Backbone, Marionette, $, _) {
//  this is the controller for individual publication views//

  UserView.Controller = {

    userView: function (id) {
    //  request the pub model via API handler using the 'id' argument passed from the router//
      var fetchingPubModel = Platform.request('pubModel:entities', id)
      $.when(fetchingPubModel).done(function (pubModel) {
        var pubView
        // set template for view depending on pub type//
        var template = '#pub-user-view'
        // if pub exists show it//

        if (pubModel !== undefined) {
          pubView = new UserView.Pub({
            model: pubModel,
            template: template,
          })

          pubView.on('details:pub:edit', function (model) {
            Platform.trigger('details:pub:edit', model.get('_id'))
          })

          pubView.on('content:pub:edit', function (model, type) {
            Platform.trigger('content:pub:edit', model.get('_id'))
          })
        } else {
          pubView = new UserView.MissingPub()
        }
        Platform.regions.main.show(pubView)
      })
    }
  }
})

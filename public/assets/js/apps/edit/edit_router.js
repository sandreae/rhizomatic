Platform.module('EditApp', function(EditApp, Platform, Backbone, Marionette, $, _){
// this is the EditApp router//

// define router and pass it an object containing url fragments on the left and callback methods on the right//
  EditApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'publications/:id/edit/content': 'editPub'
    }
  })

// define public methods with API object which must contain the Router located in the appRoutes object//
  var API = {
    editPub: function (id) {
      EditApp.Edit.Edit.Controller.editPub(id)
    }
  }

// listen for triggers then navigate to URL and call relevent controller function//

  Platform.on('content:pub:edit', function (id) {
    Platform.navigate('publications/' + id + '/edit/content')
    API.editPub(id)
  })

// instantiate a new router instance in the PubApp 'start' event handler//
  EditApp.on('start', function () {
    new EditApp.Router({
      controller: API
    })
  })
})

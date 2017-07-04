Platform.module('PubsApp', function (PubsApp, Platform, Backbone, Marionette, $, _) {
// this is the PubsApp router//

// define router and pass it an object containing url fragments on the left and callback methods on the right//
  PubsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'publications': 'listPubs',
      'publications/:id': 'showPub',
      'publications/:id/edit/details': 'editPubDetails',
      'publications/new/edit/new': 'newPubDetails'
    }
  })

// define public methods with API object which must contain the Router located in the appRoutes object//

  var API = {
    listPubs: function (criterion) {
      PubsApp.List.Controller.listPubs(criterion)
      Platform.execute('set:active:header', 'publications')
    },

    showPub: function (id) {
      PubsApp.Show.Controller.showPub(id)
    },

    editPubDetails: function (id) {
      PubsApp.Details.Controller.editPubDetails(id)
    },

    newPubDetails: function () {
      PubsApp.New.Controller.newPubDetails()
    }
  }

// listen for triggers then navigate to URL and call relevent controller function//

  Platform.on('pubs:list', function () {
    Platform.navigate('publications')
    API.listPubs()
  })

  Platform.on('pub:show', function (id) {
    Platform.navigate('publications/' + id)
    API.showPub(id)
  })

  Platform.on('pub:user:view', function (id) {
    console.log('userView triggered and recieved')
    Platform.navigate('publications/userview/' + id)
    API.userView(id)
  })

  Platform.on('details:pub:edit', function (id) {
    Platform.navigate('publications/' + id + '/edit/details')
    API.editPubDetails(id)
  })

  Platform.on('details:pub:new', function () {
    Platform.navigate('publications/new/edit/details')
    API.newPubDetails()
  })

// instantiate a new router instance in the PubApp 'start' event handler//
  PubsApp.on('start', function () {
    new PubsApp.Router({
      controller: API
    })
  })
})

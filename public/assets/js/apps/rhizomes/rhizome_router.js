Platform.module('RhizomesApp', function (RhizomesApp, Platform, Backbone, Marionette, $, _) {

  RhizomesApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      'rhizomes': 'showRhizomes',
      'newrhizome': 'newRhizome'
    }
  })

// API functions to be executed on global triggers via routing//

  var API = {

    showRhizomes: function () {
      RhizomesApp.List.Controller.listRhizomes()
      Platform.execute('set:active:header', 'rhizomes')
    },

    newRhizome: function (id) {
      RhizomesApp.New.Controller.newRhizome()
    }
  }

// listener for relative trigger events//

  Platform.on('rhizomes:list', function () {
    Platform.navigate('rhizomes')
    API.showRhizomes()
  })

  Platform.on('rhizome:new', function () {
    Platform.navigate('newrhizome')
    API.newRhizome()
  })

  RhizomesApp.on('start', function () {
    new RhizomesApp.Router({
      controller: API
    })
  })
})

Platform.module('RhizomesApp.New', function (New, Platform, Backbone, Marionette, $, _) {
  New.Controller = {
    newRhizome: function () {
      var newView = new New.Rhizome()

      newView.on('form:submit', function (data) {
        var rhizome = new Platform.Entities.Rhizome()
        rhizome.set({
          rhizomeName: data.rhizomeName
        })
        console.log(data.rhizomeName)
        console.log(rhizome)
        rhizome.save(null, {
          success: function () {
            Platform.trigger('rhizomes:list')
          }
        })
      })
      Platform.regions.main.show(newView)
    }
  }
})

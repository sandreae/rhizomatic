Platform.module('RhizomesApp.List', function (List, Platform, Backbone, Marionette, $, _) {

  List.Controller = {
    listRhizomes: function () {
      var fetchingRhizomes = Platform.request('rhizomes:entities')
      $.when(fetchingRhizomes).done(function (rhizomes) {
        console.log(rhizomes)
        var rhizomesCompositeView = new List.RhizomesCompositeView({
          collection: rhizomes
        })
        rhizomesCompositeView.on('childview:rhizome:delete', function (childView, model) {
          model.destroy({wait: true}).done(function () {
            rhizomes.remove(model)
            childView.render()
          })
        })

        rhizomesCompositeView.on('childview:rhizome:edit', function (childView, model) {
          console.log(model.get('_id'))
          Platform.trigger('rhizome:edit', model.get('_id'))
        })

        rhizomesCompositeView.on('rhizome:new', function () {
          Platform.trigger('rhizome:new')
        })

        Platform.regions.main.show(rhizomesCompositeView)
      })
    }
  }
})

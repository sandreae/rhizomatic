Platform.module('Entities', function (Entities, Platform, Backbone, Marionette, $, _) {

  Entities.Rhizome = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'http://localhost:3000/api/rhizomes',
    defaults: {
      rhizomeName: '#001'
    }
  })

  Entities.Rhizomes = Backbone.Collection.extend({
    model: Entities.Rhizome,
    url: 'http://localhost:3000/api/rhizomes'
  })

  var API = {

    getRhizomes: function () {
      var rhizomes = new Entities.Rhizomes()
      var defer = $.Deferred()
      rhizomes.fetch({
        success: function (data) {
          _.each(data.toJSON(), function (item) {
            console.log('Successfully GOT rhizome with _id: ' + item._id)
          })
          defer.resolve(data)
        },
        error: function () {
          console.log('Failed to GET rhizomes')
        }
      })
      return defer.promise()
    },

    getRhizome: function (id) {
      var rhizome = new Entities.Rhizome({_id: id})
      var defer = $.Deferred()
      rhizome.fetch({
        success: function (data) {
          defer.resolve(data)
        },
        error: function (data) {
          defer.resolve(undefined)
        }
      })
      return defer.promise()
    }
  }

  Platform.reqres.setHandler('rhizomes:entities', function () {
    return API.getRhizomes()
  })

  Platform.reqres.setHandler('rhizome:entity', function (id) {
    return API.getRhizome(id)
  })
})

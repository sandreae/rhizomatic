var Rhizome = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '/api/rhizomes',
  defaults: {
    rhizomeName: '#001'
  }
})

var Rhizomes = Backbone.Collection.extend({
  model: Rhizome,
  url: '/api/rhizomes'
})

var RhizomeAPI = {

  getRhizomes: function () {
    var rhizomes = new Rhizomes()
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
    var rhizome = new Rhizome({_id: id})
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

export {Rhizome, Rhizomes, RhizomeAPI}

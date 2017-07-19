var Rhizome = Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: 'mongodb://heroku_h881776d:8tkqo5655d6ep59hpfmd5vc10a@ds161022.mlab.com:61022/heroku_h881776d/api/rhizomes',
  defaults: {
    rhizomeName: '#001'
  }
})

var Rhizomes = Backbone.Collection.extend({
  model: Rhizome,
  url: 'mongodb://heroku_h881776d:8tkqo5655d6ep59hpfmd5vc10a@ds161022.mlab.com:61022/heroku_h881776d/heroku_h881776d/api/rhizomes'
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

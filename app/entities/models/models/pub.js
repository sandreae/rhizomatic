import 'backbone-relational'

Backbone.Model.prototype.idAttribute = '_id'

var Draft = Backbone.RelationalModel.extend({
  idAttribute: '_id'
})

var Drafts = Backbone.Collection.extend({
  model: Draft
})

  // define Pub model in Platform.Entities module//

var PubModel = Backbone.RelationalModel.extend({
  urlRoot: 'mongodb://heroku_h881776d:8tkqo5655d6ep59hpfmd5vc10a@ds161022.mlab.com:61022/heroku_h881776d/api/publications',
  idAttribute: '_id',
  relations: [{
    type: Backbone.HasMany,
    key: 'drafts',
    relatedModel: Draft,
    collectionType: Drafts,
    reverseRelation: {
      key: 'pub',
      includeInJSON: '_id'
    }
  }],

  defaults: {
    contributor: 'Your Name',
    title: 'Your Title',
    type: 'script',
    pubDate: 'publication date',
    activeContent: 'your content',
    drafts: '',
    tags: '',
    invitedBy: 'contributor name',
    directedAt: '',
    published: 'false',
    inRhizome: ''
  }
})

  // define Pubs collection in Platform.Entities module//

var PubsCollection = Backbone.Collection.extend({
  url: 'mongodb://heroku_h881776d:8tkqo5655d6ep59hpfmd5vc10a@ds161022.mlab.com:61022/heroku_h881776d/api/publications',
  model: PubModel
})

  // API object containing 'get' functions to be called via request-response//

var PubAPI = {

  // get PubsCollection function//
  getPubs: function () {
    var pubsCollection = new PubsCollection()
    // set up a promise //
    var defer = $.Deferred()
    pubsCollection.fetch({
      success: function (data) {
        _.each(data.toJSON(), function (item) {
          console.log('Successfully GOT pub with _id: ' + item._id)
        })
        defer.resolve(data)
      },
      error: function () {
        console.log('Failed to GET pubs')
      }
    })
    return defer.promise()
  },

    // get PubModel function//
    // accepts 'pubId' argument//
  getPub: function (pubId) {
    // initiate new pubModel and set id attribute//
    var pubModel = PubModel.findOrCreate({_id: pubId})
    var defer = $.Deferred()
    pubModel.fetch({
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

export {Draft, Drafts, PubModel, PubsCollection, PubAPI}

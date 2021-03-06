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
  urlRoot: '/api/publications',
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
    contributor: '',
    title: '',
    type: 'markdown',
    activeContent: '',
    drafts: [],
    tags: null,
    invitedByContrib: '',
    invitedByPubId: '',
    directedAt: null,
    published: 'false',
    publishedDate: 'not published',
    inRhizome: ''
  },

  validate: function(attrs, options) {
    var errors = {}
    if (!attrs.contributor) {
      errors.contributor = "please choose your author name for this article"
    } else {
      if (attrs.contributor.length < 2) {
        errors.contributor = "author name must be more than 1 character"
      }
    }
    if (!attrs.title) {
      errors.title = "can't be blank"
    }
    if (!attrs.type) {
      errors.type = "please choose an editing mode"
    }
    if (attrs.published === true && attrs.tags.length < 2) {
      errors.tags = "please choose one or more tags"
    }
    if (attrs.published === true && attrs.directedAt < 1) {
      errors.directedAt = "please choose someone to invite a response from"
    }
    if (!_.isEmpty(errors)) {
      return errors;
    }
  }
})

  // define Pubs collection in Platform.Entities module//

var PubsCollection = Backbone.Collection.extend({
  url: '/api/publications',
  model: PubModel,
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

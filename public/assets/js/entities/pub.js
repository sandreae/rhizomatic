Platform.module("Entities", function(Entities, Platform, Backbone, Marionette, $, _){

Backbone.Model.prototype.idAttribute = "_id";

Entities.Draft = Backbone.RelationalModel.extend({
    idAttribute: "_id" ,
  })

Entities.Drafts = Backbone.Collection.extend({
  model: Entities.Draft,
});

  // define Pub model in Platform.Entities module//

  Entities.PubModel = Backbone.RelationalModel.extend({
    urlRoot: "http://localhost:3000/api/publications",
    idAttribute: "_id",
    relations: [{
        type: Backbone.HasMany,
        key: 'drafts',
        relatedModel: Entities.Draft,
        collectionType: Entities.Drafts,
        reverseRelation: {
          key: "pub",
          includeInJSON: "_id"
        },
      }],


    defaults: {
        contributor: "Your Name",
        title: "Your Title",
        type: "script",
        pubDate: "publication date",
        activeContent: "your content",
        drafts: [],
    }
  });

  // define Pubs collection in Platform.Entities module//

  Entities.PubsCollection = Backbone.Collection.extend({
    url: "http://localhost:3000/api/publications",
    model: Entities.PubModel,
  });


  //API object containing "get" functions to be called via request-response//

  var API = {

    //get Entities.PubsCollection function//
    getPubEntities: function(){
      var pubsCollection = new Entities.PubsCollection();
      //set up a promise//
      var defer = $.Deferred();
      pubsCollection.fetch({
        success: function(data){
          _.each(data.toJSON(), function(item) {
          console.log('Successfully GOT blog with _id: ' + item._id);
          })
          defer.resolve(data)
        },
        error: function(){
          console.log("Failed to GET pubs")
        }
      });
      return defer.promise();
    },

    //get Entities.PubModel function//
    //accepts "pubId" argument//
    getPubEntity: function(pubId){
      //initiate new pubModel and set id attribute//
      var pubModel = Entities.PubModel.findOrCreate({_id : pubId});
      var defer = $.Deferred();
        pubModel.fetch({
          success: function(data){
            defer.resolve(data);
          },
          error: function(data){
            defer.resolve(undefined);
          }
        });
      return defer.promise();
    }
  };

  //make API functions public using a request-response call//
  //these are the publicly accesible handlers that manage request calls from elswhere in the app//

  //pubsCollection req-res handler//
  Platform.reqres.setHandler("pubsCollection:entities", function(){
    return API.getPubEntities();
  });

  //pubModel reqres handler accepting "id" argument and passing it on to getPubEntity function//
  Platform.reqres.setHandler("pubModel:entities", function(_id){
    return API.getPubEntity(_id);
  });
});
Platform.module("Entities", function(Entities, Platform, Backbone, Marionette, $, _){

  Backbone.Model.prototype.idAttribute = "_id";

  // define Pub model in Platform.Entities module//

  Entities.PubModel = Backbone.Model.extend({
    urlRoot: "http://localhost:3000/api/publications",
    defaults: {
        contributor: "Your Name",
        title: "Your Title",
        type: "script",
        pubDate: "publication date",
        contentWysiwyg: "blog content",
        contentImage: "image url",
        contentScript: "script content",   
        activeContent: "your content",
    }
  });

  //configure local storage//

  //Entities.configureStorage("Platform.Entities.PubModel");

  // define Pubs collection in Platform.Entities module//

  Entities.PubsCollection = Backbone.Collection.extend({
    url: "http://localhost:3000/api/publications",
    model: Entities.PubModel,
    comparator: "contributor"
  });

  //configure local storage//

  //Entities.configureStorage("Platform.Entities.PubsCollection");

  //initialize a collection of pubs (all private module variables)//

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
      var pubModel = new Entities.PubModel({_id: pubId});
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
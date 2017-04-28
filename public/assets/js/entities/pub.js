Platform.module("Entities", function(Entities, Platform, Backbone, Marionette, $, _){

  // define Pub model in Platform.Entities module//

  Entities.PubModel = Backbone.Model.extend({
    urlRoot: "publications",
    defaults: {
      id: "",
      contributor: "",
      title: "",
      type: "",
      pubDate: "",
      contentWysiwyg: "",
      contentImage: "",
      contentScript: "",      
      activeContent: "",     
    }
  });

  //configure local storage//

  Entities.configureStorage("Platform.Entities.PubModel");

  // define Pubs collection in Platform.Entities module//

  Entities.PubsCollection = Backbone.Collection.extend({
    url: "publications",
    model: Entities.PubModel,
    comparator: "contributor"
  });

  //configure local storage//

  Entities.configureStorage("Platform.Entities.PubsCollection");

  //initialize a collection of pubs (all private module variables)//

  var initializePubs = function(){
    var pubsCollection = new Entities.PubsCollection([
      {
        id: 1,
        contributor: "Jane Doe",
        title: "Blog about something",
        type: "blog",
        pubDate: "",
        contentWysiwyg: "",
        contentImage: "",
        contentScript: "",      
        activeContent: "no content",      
      },
      {
        id: 2,
        contributor: "Adam Apple",
        title: "Image about nothing",
        type: "image",
        pubDate: "",
        contentWysiwyg: "",
        contentImage: "",
        contentScript: "",      
        activeContent: "no content",      
      },
      {
        id: 3,
        contributor: "Barry Belgium",
        title: "Script about everything",
        type: "script",
        pubDate: "",
        contentWysiwyg: "",
        contentImage: "",
        contentScript: "test",   
        activeContent: "no content",   
      },   
      ]);
    //save each pubModel in pubsCollection to localstorage//
    pubsCollection.forEach(function(pubModel){
      pubModel.save();
    });
    return pubsCollection;
  };

  //API object containing "get" functions to be called via request-response//

  var API = {

    //get Entities.PubsCollection function//
    getPubEntities: function(){
      var pubsCollection = new Entities.PubsCollection();
      //fetch pubsCollection from their local storage URL location//
      pubsCollection.fetch();
      //if we don't have any pubs yet, create some//
      if(pubsCollection.length === 0){
        return initializePubs();
      }
      return pubsCollection;
    },

    //get Entities.PubModel function//
    //accepts "pubId" argument//
    getPubEntity: function(pubId){
      //initiate new pubModel and set id attribute//
      var pubModel = new Entities.PubModel({id: pubId});
      pubModel.fetch();
      return pubModel;
    }
  };

  //make API functions public using a request-response call//
  //these are the publicly accesible handlers that manage request calls from elswhere in the app//

  //pubsCollection req-res handler//
  Platform.reqres.setHandler("pubsCollection:entities", function(){
    return API.getPubEntities();
  });

  //pubModel reqres handler accepting "id" argument and passing it on to getPubEntity function//
  Platform.reqres.setHandler("pubModel:entities", function(id){
    return API.getPubEntity(id);
  });
});
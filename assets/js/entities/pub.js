Platform.module("Entities", function(Entities, Platform, Backbone, Marionette, $, _){
    Entities.Pub = Backbone.Model.extend({
        urlRoot: "pubs",
        
        defaults: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            img:"",
            type: "",
            html: "",
    }
        
});
    
    Entities.configureStorage("Platform.Entities.Pub")
    
    Entities.PubCollection = Backbone.Collection.extend({
        url: "pubs",
        model: Entities.Pub,
        comparator: "firstName"
    });

    Entities.configureStorage("Platform.Entities.PubCollection")
    
    var initializePubs = function(){
        var pubs = new Entities.PubCollection([
            { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184", template: "blog", img:""},
            { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163"},
            { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129"}
        ]);
        pubs.forEach(function(pub){
            pub.save();
        });
        return pubs.models;
    };
    
    var API = {
         getPubEntities: function(){
      var pubs = new Entities.PubCollection();
      var defer = $.Deferred();
      pubs.fetch({
        success: function(data){
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function(fetchedPubs){
        if(fetchedPubs.length === 0){
          // if we don't have any pubs yet, create some for convenience
          var models = initializePubs();
          pubs.reset(models);
        }
      });
      return promise;
    },
        
    getPubEntity: function(pubId){
            var pub = new Entities.Pub({id: pubId});
            var defer = $.Deferred();
            setTimeout(function(){
                pub.fetch({
                    success: function(data){
                        defer.resolve(data);
                    },
                    error: function(data){
                        defer.resolve(undefined);
                    }
                });     
            }, 0);
        return defer.promise();
        }
    };

Platform.reqres.setHandler("pub:entities", function(){
    return API.getPubEntities();
    });

Platform.reqres.setHandler("pub:entity", function(id){
    return API.getPubEntity(id);
    });
});
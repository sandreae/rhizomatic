Platform.module("Entities", function(Entities, Platform, Backbone, Marionette, $, _){
    Entities.Publication = Backbone.Model.extend({});
    
    Entities.PublicationCollection = Backbone.Collection.extend({
        model: Entities.Publication,
    });
    
    var publications;
    
    var initializePublications = function(){
        publications = new Entities.PublicationCollection([
            { id: 1, contributor: "Alice", title: "Being Alice", summary: "my interesting article" },
            { id: 2, contributor: "Bob", title: "Poop", summary: "some pictures of poop"  },
            { id: 3, contributor: "Charlie", title: "Re: Poop", summary: "a response to \"Poop\""  }
        ]);
    };
    
    var API = {
        getPublicationEntities: function(){
            if(publications === undefined){
                initializePublications();
            }
            return publications;
        }
    };

Platform.reqres.setHandler("publication:entities", function(){
    return API.getPublicationEntities();
    });
});
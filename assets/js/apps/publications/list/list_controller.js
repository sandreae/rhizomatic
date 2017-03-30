Platform.module("PublicationsApp.List", function(List, Platform, Backbone, Marionette, $, _){
    
    List.Controller = {    
        listPublications: function(){
            var publications = Platform.request("publication:entities");
            
            var publicationsListView = new List.Publications({
                collection: publications
            });
            
            publicationsListView.on("childview:publication:delete", function(childView, model){
                publications.remove(model);
                });

            publicationsListView.on("childview:publication:show",
                               function(childView, model){
                                    Platform.trigger("publication:show", model.get("id"))
            });

            Platform.regions.main.show(publicationsListView)
        }
    }
});
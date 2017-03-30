Platform.module("PublicationsApp", function(PublicationsApp, Platform, Backbone, Marionette, $, _){
    PublicationsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
        "publications": "listPublications",
        "publications/:id": "showPublication"
        }
    });
    
    var API = {
        listPublications: function(){
            PublicationsApp.List.Controller.listPublications();
        },
        
        showPublication: function(id){
            PublicationsApp.Show.Controller.showPublication(id)
        }
    };

    Platform.on("publications:list", function(){
        Platform.navigate("publications");
        API.listPublications();

    })
    
    Platform.on("publication:show", function(id){
        Platform.navigate("publications/" + id);
        API.showPublication(id);
    });
    
    PublicationsApp.on("start", function(){
        new PublicationsApp.Router({
            controller:API
        });
    });
});
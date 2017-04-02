Platform.module("PubsApp", function(PubsApp, Platform, Backbone, Marionette, $, _){
    PubsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
        "pubs": "listPubs",
        "pubs/:id": "showPub",
        "pubs/:id/edit": "editPub"
        }
    });
    
    var API = {
        listPubs: function(){
            PubsApp.List.Controller.listPubs();
        },
        
        showPub: function(id){
            PubsApp.Show.Controller.showPub(id)
        },
        
        editPub: function(id){
            PubsApp.Edit.Controller.editPub(id)
        },
    };

    Platform.on("pubs:list", function(){
        Platform.navigate("pubs");
        API.listPubs();
    });
    
    Platform.on("pub:show", function(id){
        Platform.navigate("pubs/" + id);
        API.showPub(id);
    });
    
    Platform.on("pub:edit", function(id){
        Platform.navigate("pubs/" + id + "/edit");
        API.showPub(id);
    });
    
    PubsApp.on("start", function(){
        new PubsApp.Router({
            controller:API
        });
    });
});
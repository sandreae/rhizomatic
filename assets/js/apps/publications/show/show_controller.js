Platform.module("PublicationsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
    Show.Controller = {
        showPublication: function(id){
            var publications = Platform.request("publication:entities");
            var model = publications.get(id);
            var publicationView = new Show.Publication({
                model: model
            });
            
        
            Platform.regions.main.show(publicationView);
        }
    }
});
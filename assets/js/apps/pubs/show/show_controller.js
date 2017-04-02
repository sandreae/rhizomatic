Platform.module("PubsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
  Show.Controller = {
    showPub: function(id){
        var loadingView = new Platform.Common.Views.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using loading view."
        });
        
        Platform.regions.main.show(loadingView);

        var fetchingPub = Platform.request("pub:entity", id);
        $.when(fetchingPub).done(function(pub){
            var pubView;
            if(pub !== undefined){
                pubView = new Show.Pub({
                model: pub
                });
                
                pubView.on("pub:edit", function(pub){
                    Platform.trigger("pub:edit", pub.get("id"));
                });
                
            }
            else{
                pubView = new Show.MissingPub();
            }

        Platform.regions.main.show(pubView);
      });
    }
  }
});
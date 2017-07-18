Platform.module("PubsApp.Edit", function(Edit, Platform, Backbone, Marionette, $, _){
  Edit.Controller = {
    editPub: function(id){
      var loadingView = new Platform.Common.Views.Loading({
        title: "Artificial Loading Delay",
        message: "Data loading is delayed to demonstrate using a loading view."
      });
      Platform.regions.main.show(loadingView);

      var fetchingPub = Platform.request("pub:entity", id);
      $.when(fetchingPub).done(function(pub){
        var view;
        if(pub !== undefined){
          view = new Edit.Pub({
            model: pub,
            generateTitle: true,            
          });
            view.on("form:submit", function(data){
                pub.save(data);
                Platform.trigger("pub:show", pub.get("id"))
            })
            view.on("content:edited", function(){
                pub.save();
                Platform.trigger("pub:edit", pub.get("id"))
            })
        
        }
        else{
          view = new Platform.PubsApp.Show.MissingPub();
        }

        Platform.regions.main.show(view);
      });
    }
  };
});
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
            var type = pub.get("type");
            console.log(type);
            if(pub !== undefined){
                if (type === "blog") {
                pubView = new Show.BlogPub({
                model: pub
                })
                } else if (type === "image") {
                pubView = new Show.ImgPub({
                model: pub
                })
                } else if (type === "html") {
                pubView = new Show.HtmlPub({
                model: pub
                })
                } else {
                pubView = new Show.BlogPub({
                model: pub
                })
                }
                
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
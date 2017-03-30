var Platform = new Marionette.Application();

Platform.navigate = function(route, options){
    options || (options = {});
    Backbone.history.navigate(route, options)
};

Platform.getCurrentRoute = function(){
    return Backbone.history.fragment
};

Platform.on("before:start", function(){
  var RegionContainer = Marionette.LayoutView.extend({
    el: "#app-container",

    regions: {
      main: "#main-region"
    }
  });

  Platform.regions = new RegionContainer();
});

Platform.on("start", function(){
  if(Backbone.history){
      Backbone.history.start();
      
      if(this.getCurrentRoute() === ""){
          Platform.trigger("publications:list");
      }
  }
});

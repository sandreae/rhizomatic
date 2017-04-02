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
      main: "#main-region",
      dialog: "#dialog-region"
    }
  });

    Platform.regions = new RegionContainer();
    Platform.regions.dialog.onShow = function(view){
        var self = this;
        var closeDialog = function(){
            self.stopListening();
            self.empty();
            self.$el.dialog("destroy");
        };
        this.listenTo(view, "dialog:close", closeDialog);
        
        this.$el.dialog({
            modal: true,
            title: view.title,
            width: "auto",
            close: function(e, ui){
                closeDialog();
            }
        });
    };
});

Platform.on("start", function(){
  if(Backbone.history){
      Backbone.history.start();
      
      if(this.getCurrentRoute() === ""){
          Platform.trigger("pubs:list");
      }
  }
});

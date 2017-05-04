Platform.module("HeaderApp.List", function(List, Platform, Backbone, Marionette, $, _){
  List.Controller = {
    listHeader: function(){
      var links = Platform.request("header:entities");
      var headers = new List.Headers({collection: links});

      headers.on("brand:clicked", function(){
        Platform.trigger("pubs:list");
      });

      headers.on("childview:navigate", function(childView, model){
        var trigger = model.get("navigationTrigger");
        Platform.trigger(trigger);
      });

      Platform.regions.header.show(headers);
    },

    setActiveHeader: function(headerUrl){
      var links = Platform.request("header:entities");
      var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
      headerToSelect.select();
      links.trigger("reset");
    }
  };
});
Platform.module("HeaderApp", function(Header, Platform, Backbone, Marionette, $, _){
  var API = {
    listHeader: function(){
      Header.List.Controller.listHeader();
    }
  };

  Platform.commands.setHandler("set:active:header", function(name){
    Platform.HeaderApp.List.Controller.setActiveHeader(name);
  });

  Header.on("start", function(){
    API.listHeader();
  });
});
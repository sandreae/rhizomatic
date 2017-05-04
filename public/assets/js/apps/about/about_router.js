Platform.module("AboutApp", function(AboutApp, Platform, Backbone, Marionette, $, _){
  AboutApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "about" : "showAbout"
    }
  });

  var API = {
    showAbout: function(){
      AboutApp.Show.Controller.showAbout();
      Platform.execute("set:active:header", "about")
    }
  };

  Platform.on("about:show", function(){
    Platform.navigate("about");
    API.showAbout();
  });

  AboutApp.on("start", function(){
    new AboutApp.Router({
      controller: API
    });
  });
});
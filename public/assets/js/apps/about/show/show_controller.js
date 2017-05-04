Platform.module("AboutApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
  Show.Controller = {
    showAbout: function(){
      var view = new Show.Message();
      Platform.regions.main.show(view);
    }
  };
});
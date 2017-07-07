Platform.module("SidebarApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
  Show.Controller = {
    showLogin: function(){
      var view = new Show.Message();
      Platform.regions.sidenav.show(view);
    }
  };
});
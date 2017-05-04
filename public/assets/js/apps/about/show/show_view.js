Platform.module("AboutApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
  Show.Message = Marionette.ItemView.extend({
    template: "#about-message"
  });
});
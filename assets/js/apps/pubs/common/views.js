Platform.module("PubsApp.Common.Views", function(Views, platform, Backbone, Marionette, $, _){
  Views.Form = Marionette.ItemView.extend({
      template: "#pub-form",

      events: {
        "click button.js-submit": "submitClicked"
      },    
      
      submitClicked: function(e){
          e.preventDefault();
          var data = Backbone.Syphon.serialize(this);
          this.trigger("form:submit", data);
      },
  });
});
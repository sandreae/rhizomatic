Platform.module("UsersApp.New", function(New, Platform, Backbone, Marionette, $, _){
  New.User = Marionette.ItemView.extend({

    template: "#new-user-form",

    events: {
      "click button.js-submit": "submitClicked"
    },

    submitClicked: function(e){
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
    }
  });
});
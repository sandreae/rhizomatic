Platform.module("UsersApp.Edit", function(Edit, Platform, Backbone, Marionette, $, _){
  Edit.User = Marionette.ItemView.extend({

    template: "#user-form",

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
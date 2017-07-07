Platform.module("RhizomesApp.New", function(New, Platform, Backbone, Marionette, $, _){
  New.Rhizome = Marionette.ItemView.extend({

    template: "#new-rhizome-form",

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
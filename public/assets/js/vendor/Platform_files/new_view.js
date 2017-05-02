Platform.module("PubsApp.New", function(New, Platform, Backbone, Marionette, $, _){
//this is the view for editing publication details//

New.Pub = Marionette.ItemView.extend({
	template: "#pub-form-details",

	events: {
		"click button.js-submit": "submitClicked"
	},

	submitClicked: function(e){
		e.preventDefault();
		//serialize the form data//
		var data = Backbone.Syphon.serialize(this);
		this.trigger("form:submit", data);
	}
});
});
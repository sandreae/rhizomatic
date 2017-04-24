Platform.module("PubsApp.Content", function(Content, Platform, Backbone, Marionette, $, _){
//this is the view for editing publication content//

Content.Pub = Marionette.ItemView.extend({
	template: "#pub-form-content",

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
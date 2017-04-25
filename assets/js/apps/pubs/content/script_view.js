Platform.module("PubsApp.Edit.Script", function(Script, Platform, Backbone, Marionette, $, _){
//this is the view for editing publication content//

Script.Pub = Marionette.ItemView.extend({
	template: "#pub-edit-script",

	events: {
		"click button.js-submit": "submitClicked"
	},

	submitClicked: function(e){
		e.preventDefault();
		//serialize the form data//
		this.trigger("form:submit", content);
	},
});
});
Platform.module("PubsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
//this is the view for individual publications//

Show.MissingPub = Marionette.ItemView.extend({
	template: "#missing-pub-view"
});

Show.Pub = Marionette.ItemView.extend({
	template: "#pub-view",

	events: {
		"click js-edit-details": "editDetailsClicked"
	},

	editDetailsClicked: function(id){
		e.preventDefault();
		this.trigger("edit:pub:details", this.model);
	}
});

});


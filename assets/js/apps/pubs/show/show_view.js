Platform.module("PubsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
//this is the view for individual publications//

Show.MissingPub = Marionette.ItemView.extend({
	template: "#missing-pub-view"
});

Show.Pub = Marionette.ItemView.extend({
	template: "#pub-view",

	events: {
		"click a.js-edit-details": "editDetailsClicked",
		"click a.js-edit-content": "editContentClicked"
	},

	editDetailsClicked: function(e){
		e.preventDefault();
		this.trigger("details:pub:edit", this.model);
	},

	editContentClicked: function(e){
		e.preventDefault();
		var type = this.model.get("type");
		console.log(type);
		this.trigger("content:pub:edit", this.model, type);
	}
});

});


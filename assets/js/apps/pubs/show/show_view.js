Platform.module("PubsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
//this is the controller for individual publication views//

Show.MissingPub = Marionette.ItemView.extend({
	template: "#missing-pub-view"
});

Show.Pub = Marionette.ItemView.extend({
	template: "#pub-view"
});

});


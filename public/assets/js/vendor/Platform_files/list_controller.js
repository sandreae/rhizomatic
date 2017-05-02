Platform.module("PubsApp.List", function(List, Platform, Backbone, Marionette, $, _){

//create controller object and attach "listPubs" sub-module//
//these these functions will be publicly available//
//they should coordinate models and views, typically triggered by URLs//

List.Controller = {
	listPubs: function(){

		//request pubsCollection via API//
		var fetchingPubsCollection = Platform.request("pubsCollection:entities");

		//wait for request to complete//
		$.when(fetchingPubsCollection).done(function(pubsCollection){

		//initiate new composite view listing pubsCollection//
		var pubsCompositeView = new List.PubsCompositeView({
			collection: pubsCollection
		});

		console.log(pubsCollection);

		//function to be run on "pub:delete" triggered from our pubItemView//
		//which means we prefix the event with "childview"//

		pubsCompositeView.on("childview:pub:delete", function(childView, model){
			//the callback function revieves a reference to the childview that triggered the event//
			//followed by the arguments that were provided when the event was triggered//
			model.destroy();
		});

		pubsCompositeView.on("childview:pub:show", function(childView, model){
			//trigger "contact:show" when show button is clicked on ItemView//
			//the router reacts to this trigger by updating the URL and executing the appropriate controller action//
			Platform.trigger("pub:show", model.get("_id"));
		});

		pubsCompositeView.on("pub:new", function(){
			console.log("new-button click recieved by controller")
			Platform.trigger("details:pub:new");
		});

		Platform.regions.main.show(pubsCompositeView);
	})
	},
}

});


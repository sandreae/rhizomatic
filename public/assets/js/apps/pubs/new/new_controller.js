Platform.module("PubsApp.New", function(New, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication details//

New.Controller = {
	newPubDetails: function(){
			
			var newPub = new Platform.Entities.PubModel();

			var newPubView = new Platform.PubsApp.Details.Pub({
				model: newPub,
			});

			var pubsCollection = Platform.request("pubsCollection:entities");

			newPubView.on("form:submit", function(data){
				if(pubsCollection.length > 0){
					var highestId = pubsCollection.max(function(c){ return c.id; }).get("id");
					data.id = highestId + 1;
				}
				else{
					data.id = 1;
				}
				if(newPub.save(data)){
					console.log("new pub saved with id:" + newPub.get("id"))
					pubsCollection.add(newPub);
					Platform.trigger("pub:show", newPub.get("id"))
				}
			})

		Platform.regions.main.show(newPubView)
	}
}
});
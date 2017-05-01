Platform.module("PubsApp.Details", function(Details, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication details//

Details.Controller = {
	editPubDetails: function(id){
		//request the pub model via API handler using the "id" argument passed from the router//
		var fetchingPubModel = Platform.request("pubModel:entities", id);
		$.when(fetchingPubModel).done(function(pubModel){ 		

			var editPubDetailsView = new Details.Pub({
			model: pubModel
		});
		editPubDetailsView.on("form:submit", function(data){
			pubModel.save(data);
			Platform.trigger("pub:show", pubModel.get("id"))
		})

		Platform.regions.main.show(editPubDetailsView)
	})
	}
}
});
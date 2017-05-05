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
			var content;
			var draft = pubModel.get("drafts").find(function(model) { 
				return model.get('type') === data.type; });

			if(draft === undefined){
				content = "";	
			} else {
				content = draft.get("content")
			}


			pubModel.set({activeContent: content});
			console.log(content);
			pubModel.save(data, {
				success: function(){

					Platform.trigger("pub:show", pubModel.get("_id"))
				}
			});
		})

		Platform.regions.main.show(editPubDetailsView)
	})
	}
}
});
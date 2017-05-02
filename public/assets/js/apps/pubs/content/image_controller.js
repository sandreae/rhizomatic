Platform.module("PubsApp.Edit.Image", function(Image, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication content//

Image.Controller = {
	editPubImage: function(id){
		//request the pub model via API handler using the "id" argument passed from the router//
		var fetchingPubModel = Platform.request("pubModel:entities", id);
		$.when(fetchingPubModel).done(function(pubModel){ 		
		var editPubContentView = new Image.Pub({
			model: pubModel
		});
		
		editPubContentView.on("form:submit", function(content){
			pubModel.set({contentImage: content})
			pubModel.set({activeContent: content});
			pubModel.save();
			Platform.trigger("pub:show", pubModel.get("_id"))
		})

		Platform.regions.main.show(editPubContentView)
	})
	}
}
});
Platform.module("PubsApp.Content", function(Content, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication content//

Content.Controller = {
	editPubContent: function(id){
		//request the pub model via API handler using the "id" argument passed from the router//
		var pubModel = Platform.request("pubModel:entities", id);
		var editPubContentView = new Content.Pub({
			model: pubModel
		});
		editPubContentView.on("form:submit", function(data){
			pubModel.save(data);
			Platform.trigger("pub:show", pubModel.get("id"))
		})

		Platform.regions.main.show(editPubContentView)
	}
}
});
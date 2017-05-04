Platform.module("PubsApp.Edit.Script", function(Script, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication content//

Script.Controller = {
	editPubScript: function(id){
		//request the pub model via API handler using the "id" argument passed from the router//
		var fetchingPubModel = Platform.request("pubModel:entities", id);
		$.when(fetchingPubModel).done(function(pubModel){ 		
		var editPubContentView = new Script.Pub({
			model: pubModel
		});
		
		editPubContentView.on("form:submit", function(content){
			pubModel.set({contentScript: content});
			pubModel.set({activeContent: content});
			pubModel.save(null, {
				success: function(){
					Platform.trigger("pub:show", pubModel.get("_id"))
				}
			});
		})

		Platform.regions.main.show(editPubContentView)
	})
	}
}
});
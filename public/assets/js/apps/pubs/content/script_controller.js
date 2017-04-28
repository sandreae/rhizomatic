Platform.module("PubsApp.Edit.Script", function(Script, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication content//

Script.Controller = {
	editPubScript: function(id){
		//request the pub model via API handler using the "id" argument passed from the router//
		var pubModel = Platform.request("pubModel:entities", id);
		var editPubContentView = new Script.Pub({
			model: pubModel
		});
		
		editPubContentView.on("form:submit", function(content){
			pubModel.set({contentScript: content});
			pubModel.set({activeContent: content});
			pubModel.save();
			Platform.trigger("pub:show", pubModel.get("id"))
		})

		Platform.regions.main.show(editPubContentView)
	}
}
});
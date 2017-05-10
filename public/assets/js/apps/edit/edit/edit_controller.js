Platform.module("EditApp.Edit.Edit", function(Edit, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication content//

Edit.Controller = {
	editPub: function(id){

		//request the pub model via API handler using the "id" argument passed from the router//
		var fetchingPubModel = Platform.request("pubModel:entities", id);
		$.when(fetchingPubModel).done(function(pubModel){

		//grab pub type and instantiate appropriate view//
		function pubViewNameify(string) {
    		return string.charAt(0).toUpperCase() + string.slice(1);}
		var pubType = pubModel.get("type");
		var pubViewName = pubViewNameify(pubType);
		var editPubContentView = new Platform.EditApp.Edit[pubViewName]["Pub"]({
			model: pubModel
		});

		//on "form:submit" save form content to existing or new draft, then save pub//
		
		editPubContentView.on("form:submit", function(content){
			//find draft for current type//
			var drafts = pubModel.get("drafts");
			var draft = drafts.findWhere({type: pubType})
			draft.set({content: content})
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
Platform.module("EditApp.Edit.Edit", function(Edit, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication content//

Edit.Controller = {
	editPub: function(id){

		//request the pub model via API handler using the "id" argument passed from the router//
		var fetchingPubModel = Platform.request("pubModel:entities", id);
		$.when(fetchingPubModel).done(function(pubModel){

		function pubViewNameify(string) {
    		return string.charAt(0).toUpperCase() + string.slice(1);
		}

		var pubType = pubModel.get("type");

		var pubViewName = pubViewNameify(pubType);

		var editPubContentView = new Platform.EditApp.Edit[pubViewName]["Pub"]({
			model: pubModel
		});
		
		editPubContentView.on("form:submit", function(content){
			var draft = pubModel.get("drafts").find(function(model) { 
				return model.get('type') === pubType; });
			
			if(draft !== undefined){
				draft.set({
					content: content,
			});
			draft.save();
			} else {
				console.log("no draft exists for this type of pub, creating new draft")
				var newDraft = new Platform.Entities.Draft({ 
			            	type: pubType,
			                content: content,
			                pub: pubModel.get("_id"),
			            });
			            newDraft.save()
					}

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
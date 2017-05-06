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
			var draft = pubModel.get("drafts").find(function(model) { 
				return model.get('type') === pubType; });
			
			//if it exists set new content and save//
			if(draft !== undefined){
				draft.set({
					content: content,
			});
			draft.save();
			} else {
				//if it doesn't exist, create new draft for this style//
				console.log("no draft exists for this type of pub, creating new draft")
				var newDraft = new Platform.Entities.Draft({ 
			            	type: pubType,
			                content: content,
			                pub: pubModel.get("_id"),
			            });
			            newDraft.save()
					}

			//set active content for this pub//
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
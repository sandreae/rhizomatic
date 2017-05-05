Platform.module("PubsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
//this is the controller for individual publication views//

Show.Controller = {
	showPub: function(id){
		//request the pub model via API handler using the "id" argument passed from the router//
		var fetchingPubModel = Platform.request("pubModel:entities", id);
		$.when(fetchingPubModel).done(function(pubModel){ 
			var pubView;
			var template = "#pub-view-" + pubModel.get("type")
			console.log(template)
			//if pub exists show it//
			if(pubModel !== undefined){
				pubView = new Show.Pub({
				model: pubModel,
				template: template,
			});

			pubView.on("details:pub:edit", function(model){
				Platform.trigger("details:pub:edit", model.get("_id"));
			});

			pubView.on("content:pub:edit", function(model, type){
				Platform.trigger("content:pub:edit", model.get("_id"));
			});

			}
			//else show MissingPub//
			else{
				pubView = new Show.MissingPub();
			}

			Platform.regions.main.show(pubView)
	})
	}
}

});


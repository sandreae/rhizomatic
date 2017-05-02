Platform.module("PubsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
//this is the controller for individual publication views//

Show.Controller = {
	showPub: function(id){
		//request the pub model via API handler using the "id" argument passed from the router//
		var fetchingPubModel = Platform.request("pubModel:entities", id);
		$.when(fetchingPubModel).done(function(pubModel){ 
		var pubView;
		//if pub exists show it//
		if(pubModel !== undefined){
			pubView = new Show.Pub({
			model: pubModel
		});
			pubView.on("details:pub:edit", function(model){
				Platform.trigger("details:pub:edit", model.get("id"));
		});

			pubView.on("content:pub:edit", function(model, type){
				if(type === "blog"){
					Platform.trigger("wysiwyg:pub:edit", model.get("id"));
				}
				else{
					if(type === "image"){
						Platform.trigger("image:pub:edit", model.get("id"));
					}else{
						if(type=== "script"){
							Platform.trigger("script:pub:edit", model.get("id"));
						}
					}
				}
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


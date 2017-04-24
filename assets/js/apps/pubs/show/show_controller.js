Platform.module("PubsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
//this is the controller for individual publication views//

Show.Controller = {
	showPub: function(id){
		//request the pub model via API handler using the "id" argument passed from the router//
		var pubModel = Platform.request("pubModel:entities", id);
		var pubView;
		//if pub exists show it//
		if(pubModel !== undefined){
			pubView = new Show.Pub({
			model: pubModel
		});
			pubView.on("details:edit:pub", function(pubModel){
			Platform.trigger("details:edit:pub", pubModel.get("id"));
		});

		}
		//else show MissingPub//
		else{
			pubView = new Show.MissingPub();
		}

		Platform.regions.main.show(pubView)
	}
}

});


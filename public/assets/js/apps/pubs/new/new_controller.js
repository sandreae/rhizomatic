Platform.module("PubsApp.New", function(New, Platform, Backbone, Marionette, $, _){
//this is the controller for editing publication details//

New.Controller = {
	newPubDetails: function(){
			
			var newPub = new Platform.Entities.PubModel();			
            var newPubView = new Platform.PubsApp.Details.Pub({
				model: newPub,
			});

		//request pubsCollection via API//
		var fetchingPubsCollection = Platform.request("pubsCollection:entities");

		//wait for request to complete//
		$.when(fetchingPubsCollection).done(function(pubsCollection){

			newPubView.on("form:submit", function(data){
   	
   				newPub.save(data, { 
                 	success : function(pub, response) { 
	                 	var newDraft = new Platform.Entities.Draft({ 
			            	type: data.type,
			                content: "draft content",
			                pub: pub.get("_id") 

			            });
			            newDraft.save({}, {
			            	success: function(){
			            	}
			            })
	                 	Platform.trigger("pub:show", newPub.get("_id"))
                 	},
               });
				//if(newPub.save(data)){
				//	console.log("new pub saved with id:" + newPub.get("_id"))
				//	pubsCollection.add(newPub);
				//	Platform.trigger("pub:show", newPub.get("id"))
				//}
			})

		Platform.regions.main.show(newPubView)
	})
	}
}
});
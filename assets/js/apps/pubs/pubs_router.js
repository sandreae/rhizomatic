Platform.module("PubsApp", function(PubsApp, Platform, Backbone, Marionette, $, _){
//this is the router//

//define router and pass it an object containing url fragments on the left//
//and callback methods on the right//
PubsApp.Router = Marionette.AppRouter.extend({
	appRoutes: {
		"publications": "listPubs",
		"publications/:id": "showPub",
		"publications/:id/edit/details": "editPubDetails"
	}
});

//define public methods with API object which must contain the callbacks//
//located in the appRoutes object//
var API = {
	listPubs: function(){
		PubsApp.List.Controller.listPubs();
	},

	//showPub function accepts "id" argument provided as URL fragment//
	showPub: function(id){
		PubsApp.Show.Controller.showPub(id);
	},

	editPubDetails: function(id){
		PubsApp.Details.Controller.editPubDetails(id);
	}
};

//listen for "pubs:list" trigger then navigate to "publications" URL and call "listPubs" function//
Platform.on("pubs:list", function(){
	Platform.navigate("publications");
	API.listPubs();
});

//listen for "pub:show" containing model "id" argument sent from List.Controller onShowClicked//
//execute relevent navigation and controller functions//
Platform.on("pub:show", function(id){
	Platform.navigate("publications/" + id);
	API.showPub(id);
})
Platform.on("details:pub:edit", function(id){
	Platform.navigate("publications/" + id + "/edit/details");
	API.editPubDetails(id);
})

//instantiate a new router instance in the PubApp "start" event handler//
PubsApp.on("start", function(){
	new PubsApp.Router({
		controller: API
	})
})

});


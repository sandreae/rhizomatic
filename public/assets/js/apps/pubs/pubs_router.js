Platform.module("PubsApp", function(PubsApp, Platform, Backbone, Marionette, $, _){
//this is the router//

//define router and pass it an object containing url fragments on the left//
//and callback methods on the right//
PubsApp.Router = Marionette.AppRouter.extend({
	appRoutes: {
		"publications": "listPubs",
		"publications/:id": "showPub",
		"publications/:id/edit/details": "editPubDetails",
		"publications/new/edit/script": "newPubDetails",
		"publications/:id/edit/image": "editPubImage",
		"publications/:id/edit/wysiwyg": "editPubWysiwyg",
		"publications/:id/edit/script": "editPubScript",

	}
});

//define public methods with API object which must contain the callbacks//
//located in the appRoutes object//
var API = {
	listPubs: function(criterion){
		PubsApp.List.Controller.listPubs(criterion);
		Platform.execute("set:active:header", "publications")
	},

	//showPub function accepts "id" argument provided as URL fragment//
	showPub: function(id){
		PubsApp.Show.Controller.showPub(id);
	},

	editPubDetails: function(id){
		PubsApp.Details.Controller.editPubDetails(id);
	},

	newPubDetails: function(){
		PubsApp.New.Controller.newPubDetails();
	},

	editPubImage: function(id){
		PubsApp.Edit.Image.Controller.editPubImage(id);
	},

	editPubWysiwyg: function(id){
		PubsApp.Edit.Wysiwyg.Controller.editPubWysiwyg(id);
	},

	editPubScript: function(id){
		PubsApp.Edit.Script.Controller.editPubScript(id);
	}
};

//listen for triggers then navigate to "publications" URL and call relevent controller function//

Platform.on("pubs:list", function(){
	Platform.navigate("publications");
	API.listPubs();
});

//listen for "pub:show" containing model "id" argument sent from List.Controller onShowClicked//
Platform.on("pub:show", function(id){
	Platform.navigate("publications/" + id);
	API.showPub(id);
})

Platform.on("details:pub:edit", function(id){
	Platform.navigate("publications/" + id + "/edit/details");
	API.editPubDetails(id);
})

Platform.on("details:pub:new", function(){
	Platform.navigate("publications/new/edit/details");
	API.newPubDetails();
})

Platform.on("wysiwyg:pub:edit", function(id){
	Platform.navigate("publications/" + id + "/edit/wysiwyg");
	API.editPubWysiwyg(id);
})

Platform.on("image:pub:edit", function(id){
	Platform.navigate("publications/" + id + "/edit/image");
	API.editPubImage(id);
})

Platform.on("script:pub:edit", function(id){
	Platform.navigate("publications/" + id + "/edit/script");
	API.editPubScript(id);
})

//instantiate a new router instance in the PubApp "start" event handler//
PubsApp.on("start", function(){
	new PubsApp.Router({
		controller: API
	})
})

});


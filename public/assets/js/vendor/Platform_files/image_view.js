Platform.module("PubsApp.Edit.Image", function(Image, Platform, Backbone, Marionette, $, _){
//this is the view for editing publication content//

Image.Pub = Marionette.ItemView.extend({
	template: "#pub-edit-image",

	events: {
		"click button.js-submit": "submitClicked"
	},

	submitClicked: function(e){
		e.preventDefault();
		//serialize the form data//
		this.trigger("form:submit", content);
	},

	onShow: function(){
		this.$("#my-dropzone").dropzone({
			url: "/file/post", 

    		init : function() {

        		myDropzone = this;

		        //Restore initial message when queue has been completed
		        this.on("thumbnail", function(event) {
		            console.log(myDropzone.files);            
		        });
		    }
		});	
	}
});
});
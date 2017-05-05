Platform.module("EditApp.Edit.Script", function(Script, Platform, Backbone, Marionette, $, _){
//this is the view for editing publication content//

Script.Pub = Marionette.ItemView.extend({
	template: "#pub-edit-script",

	events: {
		"click button.js-submit": "submitClicked"
	},

	submitClicked: function(e){
		e.preventDefault();
		//serialize the form data//
		var editor = $('.CodeMirror')[0].CodeMirror;
		var content = editor.getValue();
		this.trigger("form:submit", content);
	},

	onShow: function(){
		var thisModel = this.model;
		var myTextArea = this.$("#myTextArea").get(0);
		
		var editor = CodeMirror(function(elt) {
  			myTextArea.parentNode.replaceChild(elt, myTextArea);
  		}, 
  		{
			theme: "blackboard",
			mode: "text/html",
			value: thisModel.get("activeContent"),
		});

		editor.refresh();


	}
});
});
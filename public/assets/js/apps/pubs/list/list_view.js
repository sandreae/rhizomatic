Platform.module("PubsApp.List", function(List, Platform, Backbone, Marionette, $, _){

	//define pub list item view//

 List.PubItemView = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#pub-list-item",

    //when the views DOM element is clicked call "highlightName"//

    events: {
    	"click": "highlightName",
    	"click a.js-show-pub": "showClicked",
    	"click button.js-delete-pub": "deleteClicked",

    },

    //using e.target gives us the DOM element that triggered this event function//
    //wrapping it in $() turns it into a jQuery object//
    //	console.log($(e.target).text())


    // this.$el returns a jQuery object wrapping the views DOM element//
    // in this case, that is <tr>//
    //this event function should be in the "view" because it changes the display, not data//

    highlightName: function(){
    	this.$el.toggleClass("warning");
    },

    deleteClicked: function(e){
    	//stops the "click" event bubbling up to parent elements//
    	e.stopPropagation();
    	this.trigger("pub:delete", this.model);
    },

    showClicked: function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	this.trigger("pub:show", this.model);
    },

    remove: function(){
    	var self = this;
    	//fadeOut ItemView when deleted by accessing the "remove" lifecycle event//
    	this.$el.fadeOut(function(){
    		//once the fadeOut has finished, scope out the original "remove" function using "prototype" 
    		//and call it on "this" to remove the model and clear up any dependencies//
    		Marionette.ItemView.prototype.remove.call(self);
    	});
    },

  });


	//define Composite View//
	//a Composite View is the same as a Collection except it can have a wrapper template for the generated list//

  List.PubsCompositeView = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#pubs-list",
    childView: List.PubItemView,
    childViewContainer: "tbody",
    events: {
        "click button.js-new-pub": "newClicked"
    },

    templateContext: {
        model: "100"
    },
    
        newClicked: function(e){
        e.preventDefault();
        this.trigger("pub:new");
    },

  });
});
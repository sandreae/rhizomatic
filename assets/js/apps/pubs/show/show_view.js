Platform.module("PubsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
    
    Show.MissingPub = Marionette.ItemView.extend({
        template: "#missing-pub-view",
        
    });
    
    Show.Pub = Marionette.ItemView.extend({
        template: "#pub-view",

        getTemplate: function(){
        if (this.model.get("template") === "blog"){
        return "#pub-view-blog";
        } else if (this.model.get("template") === "img"){
        return "#pub-view-img";
        } else if (this.model.get("template") === "html"){
        return "#pub-view-html";
        } else {
        return "#missing-pub-template";
        }
        },
        
        events: {
            "clicked a.js-edit": "editClicked"
        },
        
        editClicked: function(e){
            e.preventDefault();
            this.trigger("pub:edit", this.model)
        }
    });
});
Platform.module("PubsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
    
    Show.MissingPub = Marionette.ItemView.extend({
        template: "#missing-pub-view",
        
    });
    
    Show.Pub = Marionette.ItemView.extend({
        template: "#pub-view",

        events: {
            "clicked a.js-edit": "editClicked"
        },
        
        editClicked: function(e){
            e.preventDefault();
            this.trigger("pub:edit", this.model)
        }
    });
    
    Show.BlogPub = Marionette.ItemView.extend({
        template: "#pub-view-blog",

        events: {
            "clicked a.js-edit": "editClicked"
        },
        
        editClicked: function(e){
            e.preventDefault();
            this.trigger("pub:edit", this.model)
        }
    });
    
    Show.ImgPub = Marionette.ItemView.extend({
        template: "#pub-view-img",

        events: {
            "clicked a.js-edit": "editClicked"
        },
        
        editClicked: function(e){
            e.preventDefault();
            this.trigger("pub:edit", this.model)
        }
    });
    
    Show.HtmlPub = Marionette.ItemView.extend({
        template: "#pub-view-html",

        events: {
            "clicked a.js-edit": "editClicked"
        },
        
        editClicked: function(e){
            e.preventDefault();
            this.trigger("pub:edit", this.model)
        }
    });
});
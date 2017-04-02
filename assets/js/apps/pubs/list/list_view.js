Platform.module("PubsApp.List", function(List, Platform, Backbone, Marionette, $, _){
    
    List.Layout = Marionette.LayoutView.extend({
        template: "#pub-list-layout",
        
        regions: {
            panelRegion: "#panel-region",
            pubsRegion: "#pubs-region"
        }
    });
    
    List.Panel = Marionette.ItemView.extend({
        template: "#pub-list-panel",
        
        triggers: {
            "click button.js-new": "pub:new"
        }
    });
    
    List.Pub = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#pub-list-item",
        
        triggers: {
            "click a.js-show": "pub:show",
            "click a.js-edit": "pub:edit",
            "click button.js-delete": "pub:delete"
        },
        
        events:{
            "click": "highlightName",
        },
        
        highlightName: function(e){
            e.preventDefault();
            this.$el.toggleClass("warning");
        },
   
        remove: function(){
            var self = this;
            this.$el.fadeOut(function(){
                Marionette.ItemView.prototype.remove.call(self)
            });
        },

    });
    List.Pubs = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: "#pub-list",
        childView: List.Pub,
        childViewContainer: "tbody"
    });
});
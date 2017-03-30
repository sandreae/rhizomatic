Platform.module("PublicationsApp.List", function(List, Platform, Backbone, Marionette, $, _){
    List.Publication = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#publication-list-item",
        
        events:{
            "click": "highlightName",
            "click a.js-show": "showClicked",
            "click button.js-delete": "deleteClicked"
        },
        
        highlightName: function(e){
            e.preventDefault();
            this.$el.toggleClass("warning");
        },
        
        showClicked: function(e){
            e.preventDefault();
            e.stopPropagation();
            this.trigger("publication:show", this.model);
        },
        
        deleteClicked: function(e){
            e.stopPropagation();
            this.trigger("publication:delete", this.model);
        },
        
        remove: function(){
            var self = this;
            this.$el.fadeOut(function(){
                Marionette.ItemView.prototype.remove.call(self)
            });
        },

    });
    List.Publications = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: "#publication-list",
        childView: List.Publication,
        childViewContainer: "tbody"
    });
});
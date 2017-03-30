Platform.module("PublicationsApp.Show", function(Show, Platform, Backbone, Marionette, $, _){
    Show.Publication = Marionette.ItemView.extend({
        template: "#publication-view"
    });
});
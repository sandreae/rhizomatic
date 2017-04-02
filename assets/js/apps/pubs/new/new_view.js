Platform.module("PubsApp.New", function(New, Platform, Backbone, Marionette, $, _){
    New.Pub = Platform.PubsApp.Common.Views.Form.extend({
        title: "New Contact"
    });
});
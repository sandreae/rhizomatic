Platform.module("UsersApp.Login", function(Login, Platform, Backbone, Marionette, $, _){
  
  Login.Form = Marionette.ItemView.extend({

    template: "#login-form",

    events: {
      "click button.js-login": "login"
    },

    login: function (e) {
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.$('.alert').hide();
        console.log('login with ', data);
        this.trigger("form:submit", data)
    }
  });
});
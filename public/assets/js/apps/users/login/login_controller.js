Platform.module("UsersApp.Login", function(Login, Platform, Backbone, Marionette, $, _){
  Login.Controller = {
    login: function(id){

        var loginView = new Login.Form(); 

        loginView.on("form:submit", function(data){
          var globals = Platform.Entities.Globals

          $.ajax({
              url: globals.urls.AUTHENTICATE,
              type: 'POST',
              dataType: 'json',
              data: data,
              success: function(response){
                console.log(response)
                  if (response.success){
                      Platform.request("authenticated:entities", response);
                  } else {
                      self.$('.alert-warning').text(response.message).show();
                  }
              }
          });
        })
        Platform.regions.main.show(loginView);
    }
  };
});
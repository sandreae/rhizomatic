Platform.module("UsersApp.New", function(New, Platform, Backbone, Marionette, $, _){
  New.Controller = {
    newUser: function(id){

        var newView = new New.User(); 

        newView.on("form:submit", function(data){
          var user = new Platform.Entities.User();
          user.set({
            userName: data.userName,
            email: data.email,
            password: data.password,
            permissions: "admin"
          })
          user.save(null, {
            success: function(){
              Platform.trigger("users:list");
            }
          });
        })
        Platform.regions.main.show(newView);
    }
  };
});
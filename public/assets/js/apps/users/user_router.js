Platform.module("UsersApp", function(UsersApp, Platform, Backbone, Marionette, $, _){


  UsersApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "login" : "login",
      "logout" : "logout",
      "users" : "showUsers",
      "users/:id/edit" : "editUser",
      "newuser" : "newUser"
    }
  });


//API functions to be executed on global triggers via routing//

  var API = {

    login: function(){
    UsersApp.Login.Controller.login();
    Platform.execute("set:active:header", "login")
    },

    logout: function() {  
      Platform.request("logout:entities")
    },

    showUsers: function(){
      if(Platform.request("isAuthenticated:entities")){
        UsersApp.List.Controller.listUsers();
        Platform.execute("set:active:header", "users")
      }
      else {
        Platform.trigger("user:login")
      }
    },

    editUser: function(id){
      UsersApp.Edit.Controller.editUser(id);
    },

    newUser: function(id){
      UsersApp.New.Controller.newUser();
    },
  };

//listener for relative trigger events//
  Platform.on("user:login", function(){
    Platform.navigate("login");
    API.login();
  });

  Platform.on("logout", function(){
    Platform.navigate("logout");
    API.logout();
  });

  Platform.on("users:list", function(){
    Platform.navigate("users");
    API.showUsers();
  });

  Platform.on("user:edit", function(id){
    Platform.navigate("users/" + id + "/edit");
    API.editUser(id);
  });

  Platform.on("user:new", function(){
    Platform.navigate("newuser");
    API.newUser();
  });

  UsersApp.on("start", function(){
    new UsersApp.Router({
      controller: API
    });
  });
});
Platform.module("Authentification", function(Authentification, Platform, Backbone, Marionette, $, _){

  var user;
  var isAuthenticated;
  var applicationInfo;
  var permissions;

  var API = {

      authenticated: function(response){
        window.localStorage.setItem(Platform.Entities.Globals.auth.TOKEN_KEY, response.token);
        window.localStorage.setItem(Platform.Entities.Globals.auth.USER_KEY, response._id);
        Platform.request("initializeUser:entities")
        Platform.trigger("pubs:list");
      },

      logout: function() {
        window.localStorage.removeItem(Platform.Entities.Globals.auth.TOKEN_KEY);
        window.localStorage.removeItem(Platform.Entities.Globals.auth.USER_KEY);
        user = null;
        permissions = false;
        Platform.trigger("updateUserInfo")
        Platform.trigger("pubs:list")
        },

      isAuthenticated: function() {  
        return window.localStorage.getItem(Platform.Entities.Globals.auth.TOKEN_KEY);
        },

      initialize: function() {
        console.log("initialize called")
        var d = $.Deferred();
        if (applicationInfo !== null) {
            d.resolve();
        } else {
            $.ajax({
                url: Platform.Entities.Globals.urls.APP_INFO,
                success: function (data) {
                    applicationInfo = data;
                    d.resolve();
                },

                error: function(){
                  console.log("get globals error")
                }
            });
        }
        return d.promise();
      },

      initializeUser: function() {
        console.log("initializeUser called")
        var d = $.Deferred();
        if (Platform.request("isAuthenticated:entities") && !user) {
            user = new Platform.Entities.User({_id: window.localStorage.getItem(Platform.Entities.Globals.auth.USER_KEY)});
            user.fetch().success(function () {
                console.log(user.get("permissions"))
                permissions = Platform.request("permissions:entities", user.get('permissions'));
                console.log(permissions)
                Platform.trigger("updateUserInfo")
                d.resolve();
            });
        } else {
            d.resolve();
        }
        return d.promise();
      },

      getApplicationInfo: function() { 
        console.log("getApplicationInfo called")
        return applicationInfo;
      },

      getUser: function() {  
        console.log("getUser called")
        return user || new Platform.Entities.User();
      },

      getPermissions: function() {
        console.log("get permissions called")
        return permissions;
      }
  }

  Platform.reqres.setHandler("authenticated:entities", function(response){
  return API.authenticated(response);
  });

  Platform.reqres.setHandler("logout:entities", function(){
  return API.logout();
  });

  Platform.reqres.setHandler("isAuthenticated:entities", function(){
  return API.isAuthenticated();
  });

  Platform.reqres.setHandler("initialize:entities", function(){
  return API.initialize();
  });

  Platform.reqres.setHandler("initializeUser:entities", function(){
  return API.initializeUser();
  });

  Platform.reqres.setHandler("getApplicationInfo:entities", function(){
  return API.getApplicationInfo();
  });

  Platform.reqres.setHandler("getUser:entities", function(){
  return API.getUser();
  });

  Platform.reqres.setHandler("getPermissions:entities", function(){
  return API.getPermissions();
  });

});



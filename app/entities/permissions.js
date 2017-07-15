Platform.module("Permissions", function(Permissions, Platform, Backbone, Marionette, $, _){


  var API = {
    permissions: function(permissions){
            return _.contains(permissions, 'admin');
        }
    }

  Platform.reqres.setHandler("permissions:entities", function(permissions){
  return API.permissions(permissions);
  });

});


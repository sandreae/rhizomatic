Platform.module("Entities", function(Entities, Platform, Backbone, Marionette, $, _){

  Entities.User = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: "http://localhost:3000/api/users",
  });

  
  Entities.Users = Backbone.Collection.extend({
    model: Entities.User,
    url: "http://localhost:3000/api/users",
  });

  var API = {

    getUsers: function(){
      var users = new Entities.Users();
      var defer = $.Deferred();
      users.fetch({
        success: function(data){
          _.each(data.toJSON(), function(item) {
          console.log('Successfully GOT user with _id: ' + item._id);
          })
          defer.resolve(data)
        },
        error: function(){
          console.log("Failed to GET users")
        }
      });
      return defer.promise();
    },

    getUser: function(id){
      var user = new Entities.User({_id : id});
      var defer = $.Deferred();
        user.fetch({
          success: function(data){
            defer.resolve(data);
          },
          error: function(data){
            defer.resolve(undefined);
          }
        });
      return defer.promise();
    },
  };

  Platform.reqres.setHandler("users:entities", function(){
    return API.getUsers();
  });

  Platform.reqres.setHandler("user:entity", function(id){
    return API.getUser(id);
  });
});
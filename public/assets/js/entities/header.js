Platform.module("Entities", function(Entities, Platform, Backbone, Marionette, $, _){

  
  Entities.Header = Backbone.Model.extend({
    initialize: function(){
      var selectable = new Backbone.Picky.Selectable(this);
      _.extend(this, selectable);
    }
  });

  
  Entities.HeaderCollection = Backbone.Collection.extend({
    model: Entities.Header,

    initialize: function(){
      var singleSelect = new Backbone.Picky.SingleSelect(this);
      _.extend(this, singleSelect);
    }
  });



  var initializeHeaders = function(){
    Entities.headers = new Entities.HeaderCollection([
      { name: "Publications", url: "publications", navigationTrigger: "pubs:list"},
      { name: "About", url: "about", navigationTrigger: "about:show" },
      { name: "Users", url: "users", navigationTrigger: "users:list" },
      { name: "Logout", url: "logout", navigationTrigger: "logout" },
    ]);
  };



  var API = {
    getHeaders: function(){
      if(Entities.headers === undefined){
        initializeHeaders();
      }
      return Entities.headers;
    }
  };

  Platform.reqres.setHandler("header:entities", function(){
    return API.getHeaders();
  });
});
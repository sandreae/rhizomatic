Platform.module("PubsApp.List", function(List, Platform, Backbone, Marionette, $, _){
    
    List.Controller = {    
        listPubs: function(){    
            var loadingView = new Platform.Common.Views.Loading();
        
            Platform.regions.main.show(loadingView);
            
            var fetchingPubs = Platform.request("pub:entities");
            var pubsListLayout = new List.Layout();
            var pubsListPanel = new List.Panel();
            
            $.when(fetchingPubs).done(function(pubs){
                    var pubsListView = new List.Pubs({
                        collection: pubs          
                    });
            
            pubsListLayout.on("show", function(){
                pubsListLayout.panelRegion.show(pubsListPanel);
                pubsListLayout.pubsRegion.show(pubsListView);
            })
                
            pubsListPanel.on("pub:new", function(){
                var newPub = new Platform.Entities.Pub();
                
                var view = new Platform.PubsApp.New.Pub({
                    model: newPub,
                });
                
                view.on("form:submit", function(data){
                    if(pubs.length > 0){
                        var highestId = pubs.max(function(c){return c.id}).get("id");
                        data.id = highestId + 1;
                    }
                    else{
                        data.id = 1;
                    }
                    newPub.save(data);
                    pubs.add(newPub);
                    view.trigger("dialog:close");
                });
                Platform.regions.dialog.show(view);
            })
  
            pubsListView.on("childview:pub:edit", function(childView, args){
                
                var model = args.model;
                var view = new Platform.PubsApp.Edit.Pub({
                    model: model,
                });
                    
                view.on("form:submit", function(data){
                    model.save(data);
                    childView.render();
                    view.trigger("dialog:close");
                })
                    
                Platform.regions.dialog.show(view);
            });
                
            pubsListView.on("childview:pub:delete", function(childView, args){
                args.model.destroy();
                });                

            pubsListView.on("childview:pub:show", function(childView, args){
                Platform.trigger("pub:show", args.model.get("id"))
            });
            Platform.regions.main.show(pubsListLayout)
            });
        }
    }
});
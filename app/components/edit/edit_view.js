Platform.module("PubsApp.Edit", function(Edit, Platform, Backbone, Marionette, $, _){
  Edit.Pub = Platform.PubsApp.Common.Views.Form.extend({
      
      initialize: function(){
          var type = this.model.get("type");
          this.template = "#pub-form-" + type;
      },
      
      onRender: function(){
            console.log("PubsApp.Edit : onRender")
      },
      
        onDestroy: function(){
        console.log("form onDestroy");
        editor = ContentTools.EditorApp.get();
        editor.destroy();
  },
      

      
      onShow: function(){
        var thisModel = this.model;
        var thisView = this;

          window.addEventListener('load', function() {
              var editor;
              ContentTools.StylePalette.add([
                  new ContentTools.Style('Author', 'author', ['p'])
              ]);
            });

            editor = ContentTools.EditorApp.get();
            editor.init('*[data-editable]', 'data-name');

            editor.addEventListener('saved', function (ev) {
                var name, payload, regions, xhr;

                // Check that something changed
                regions = ev.detail().regions;
                if (Object.keys(regions).length == 0) {
                    return;
                }

                // Collect the contents of each region into a FormData instance
                payload = new FormData();
                for (name in regions) {
                    if (regions.hasOwnProperty(name)) {
                        payload.append(name, regions[name]);
                    }
                }
            var newcontent = payload.get("main-content").text();
            console.log(newcontent);
            thisModel.set({blog: newcontent});
            this.Model.save();
            thisView.trigger("content:edited")
        });
      },
  });
});
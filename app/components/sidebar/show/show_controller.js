import View from './views/show_view'
import Layout from './views/layout_view'

var Controller = {
  showLogin: function() {
    var layoutView = new Layout({
      onRender: function() {
        this.showChildView('sidebarFull', new View);
      }
    })
    Platform.Regions.getRegion('sidebar').show(layoutView)
  },

  show(view) {
    var layoutView = new Layout({
      onRender: function() {
        this.showChildView('sidebarRegion', view);
      }
    })
    Platform.Regions.getRegion('sidebar').show(layoutView)
  },

  showFull(view) {
    var layoutView = new Layout({
      onRender: function() {
        this.showChildView('sidebarFull', view);
      }
    })
    Platform.Regions.getRegion('sidebar').show(layoutView)
  }
};

export {Controller}

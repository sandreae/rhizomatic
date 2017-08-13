import Login from './views/login_view'
import Buttons from './views/buttons_view'
import Layout from './views/layout_view'

var Controller = {
  showLogin: function() {
    var sidebarRegion = Platform.Regions.getRegion('sidebar')
    var layoutView = new Layout({
      onRender: function() {
        this.showChildView('sidebarRegion1', new Login);
      }
    })
    if (!sidebarRegion.hasView()){
      sidebarRegion.show(layoutView)
    } else {
      sidebarRegion.currentView.showChildView('sidebarRegion1', new Login)
      sidebarRegion.currentView.getRegion('sidebarRegion3').empty()
    }
  },

  show(view) {
    Platform.Regions.getRegion('sidebar').currentView.showChildView('sidebarRegion1', view);
    Platform.Regions.getRegion('sidebar').currentView.showChildView('sidebarRegion3', new Buttons);
  },

  showFull(view) {
    Platform.Regions.getRegion('sidebar').currentView.showChildView('sidebarRegion1', view);
    Platform.Regions.getRegion('sidebar').currentView.getRegion('sidebarRegion3').empty()
  }
};

export {Controller}

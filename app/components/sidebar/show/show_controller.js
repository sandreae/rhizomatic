import Login from './views/login_view'
import Buttons from './views/buttons_view'
import Layout from './views/layout_view'

var Controller = {
  showLogin: function() {
    var sidebarRegion = this.checkRegion()
    sidebarRegion.currentView.showChildView('sidebarRegion1', new Login)
    sidebarRegion.currentView.getRegion('sidebarRegion3').empty()
  },

  show(view) {
    var sidebarRegion = this.checkRegion()
    sidebarRegion.currentView.showChildView('sidebarRegion1', view);
    sidebarRegion.currentView.showChildView('sidebarRegion3', new Buttons);
  },

  showFull(view) {
    var sidebarRegion = this.checkRegion()
    sidebarRegion.currentView.showChildView('sidebarRegion1', view);
    sidebarRegion.currentView.getRegion('sidebarRegion3').empty()
  },

  checkRegion: function(){
    var sidebarRegion = Platform.Regions.getRegion('sidebar')
    var layoutView = new Layout({})
    if (!sidebarRegion.hasView()){
      sidebarRegion.show(layoutView)
    }
    return sidebarRegion
  }
};

export {Controller}

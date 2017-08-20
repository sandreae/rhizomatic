import Welcome from './views/welcome_view'
import Buttons from './views/buttons_view'
import Layout from './views/layout_view'
import Help from './views/help_view'

var Controller = {
  showWelcome: function() {
    var sidebarRegion = this.checkRegion()
    sidebarRegion.currentView.showChildView('sidebarRegion1', new Welcome)
    sidebarRegion.currentView.getRegion('sidebarRegion2').empty()
  },

  show(view) {
    var sidebarRegion = this.checkRegion()
    sidebarRegion.currentView.showChildView('sidebarRegion1', view);
    sidebarRegion.currentView.showChildView('sidebarRegion2', new Buttons);
    sidebarRegion.currentView.showChildView('sidebarRegion3', new Help);
  },

  showFull(view) {
    var sidebarRegion = this.checkRegion()
    sidebarRegion.currentView.showChildView('sidebarRegion1', view);
    sidebarRegion.currentView.getRegion('sidebarRegion2').empty()
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

import View from './views/show_view'

var Controller = {
  showLogin: function(){
    var view = new View();
    Platform.Regions.getRegion('sidebar').show(new View())
  }
};

export {Controller}
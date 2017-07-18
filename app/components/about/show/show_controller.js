import {View} from './show_view'

var Controller = {

  showAbout: function() {
  	var view = new View()
    Platform.Regions.getRegion('main').show(view)
  }
}

export {Controller}

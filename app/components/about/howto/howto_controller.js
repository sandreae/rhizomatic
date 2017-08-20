import {View} from './views/howto_view'

var Controller = {

  showHowto: function() {
  	var view = new View()
    Platform.Regions.getRegion('main').show(view)
  }
}

export {Controller}

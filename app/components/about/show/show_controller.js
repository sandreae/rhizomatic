import {View} from './show_view'

var Controller = {

  showAbout: function() {
    window.Platform.getRegion('main').show(new View())
  }
}

export {Controller}

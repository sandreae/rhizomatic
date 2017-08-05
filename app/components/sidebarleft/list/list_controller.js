import LayoutView from './views/layout_view'
import {gc} from '../../radio'


var Controller = {

  listHeaders: function() {
    var headers = new LayoutView()

    Platform.Regions.getRegion('header').show(headers)
  },
}

export {Controller}

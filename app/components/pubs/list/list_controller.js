import {D3View} from './views/d3_view'
import {gc} from '../../radio'

var Controller = {
  listPubs: function() {

   $.when(gc.request('pubs:get')).done(function (pubs) {
      var d3View = new D3View({
        model: false
      })

      Platform.Regions.getRegion('main').show(d3View)
    })
  }
}

export {Controller}
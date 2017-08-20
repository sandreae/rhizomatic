import {D3View} from './views/d3_view.js'
import {gc} from '../../radio'

var Controller = {
  listPubs: function() {

    gc.request('pubs:get').then(function(pubs) {


	  var d3View = new D3View({
        collection: pubs
      })

      Platform.Regions.getRegion('main').show(d3View)
    })
  }
}

export {Controller}
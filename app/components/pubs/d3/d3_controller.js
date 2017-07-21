import {TableView} from './views/d3_view'
import {gc} from '../../radio'

var Controller = {
  d3Pubs: function() {

   $.when(gc.request('pubs:get')).done(function (pubs) {
      var tableView = new TableView({
        collection: pubs
      })

      Platform.Regions.getRegion('main').show(tableView)
    })
  }
}

export {Controller}

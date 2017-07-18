import {TableView} from './views/list_view'
import {gc} from '../../radio'

var Controller = {
  listPubs: function() {

   $.when(gc.request('pubs:get')).done(function (pubs) {
      var tableView = new TableView({
        collection: pubs
      })

      tableView.on('childview:pub:delete', function (model) {
        pubs.remove(model)
        model.destroy()
      })
      Platform.Regions.getRegion('main').show(tableView)
    })
  }
}

export {Controller}
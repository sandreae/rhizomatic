import Pub from './views/show_view'
import {MissingPub} from './views/show_missing'
import {gc} from '../../radio'

var Controller = {
  showPub: function(id) {

    var pub
    var gettingPub = gc.request('pub:get', id)
    $.when(gettingPub).done(function(pubModel) {
      if (pubModel !== undefined) {
        pub = new Pub({model: pubModel})
      } else {
        pub = new MissingPub()
      }
      Platform.Regions.getRegion('main').show(pub)
    })
  }
}

export {Controller}

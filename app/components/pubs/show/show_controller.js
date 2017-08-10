import Pub from './views/show_view'
import {MissingPub} from './views/show_missing'
import {gc} from '../../radio'

var Controller = {
  showPub: function(id) {
    var pub
    gc.request('pub:get', id).then(function(pubModel) {
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

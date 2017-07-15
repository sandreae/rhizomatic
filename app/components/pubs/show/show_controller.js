import {Pub} from './views/show_view'
import {MissingPub} from './views/show_missing'
import {gc} from '../../radio'

var Controller = {
  showPub: function(id) {

    console.log(id)

    var pub
    var gettingPub = gc.request('pub:get', id)
    $.when(gettingPub).done(function(pubModel) {
      console.log('pub:get show triggered')
      console.log(pubModel)
      if (pubModel !== undefined) {
        pub = new Pub({model: pubModel})
      } else {
        pub = new MissingPub()
      }
      Platform.getRegion('main').show(pub)
    })
  }
}

export {Controller}

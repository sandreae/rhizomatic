import Home from './views/home_view'
import {gc} from '../../radio'

var Controller = {
  showHome: function() {
    var home = new Home()
    console.log(home)
    gc.trigger('sidebar:show', home)
  }
}

export {Controller}

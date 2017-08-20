import {View} from './views/new_view'
import {gc} from '../../radio'

var Controller = {
    newRhizome: function (id) {
      var newView = new View()
      gc.trigger('sidebar:show', newView)
    }
  }

export {Controller}
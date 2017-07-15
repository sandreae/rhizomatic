import {Platform, pubsRouter, gc} from './../app/app'
import {Globals, Authentication} from './../app/entities/authentication'

document.addEventListener('DOMContentLoaded', () => {

  Platform.on('start', function () {

    if (Backbone.history) {
      Backbone.history.start()
      if (this.getCurrentRoute() === '') {
        console.log('current route null, trigger show:about')
        gc.request('show:about')
      }
    }
  })
  Platform.start();
})

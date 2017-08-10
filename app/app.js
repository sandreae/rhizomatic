import * as Behaviors from './entities/behaviors/behaviors'
import Layout from './theme/layout/layout'
import {gc} from './components/radio'

var App = Marionette.Application.extend({
  el: 'body',
  region: '#app',

  initialize: function() {
    this.Regions = new Layout()
  },

  onStart: function() {
    var initPromise = gc.request('user:init')
    console.log(initPromise)
    initPromise.then(function(){
      gc.trigger('headers:list')
      if (Backbone.history) {
        Backbone.history.start()
        if (this.getCurrentRoute() === '') {
          gc.trigger('pubs:list')
        }
      }
    })

  }
})

var Platform = new App()
window.Platform = Platform
Platform.Behaviors = Behaviors

export {Platform}


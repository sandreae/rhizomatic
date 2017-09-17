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
    var self = this
    var initPromise = gc.request('user:init')
    initPromise.then(function() {
      if (Backbone.history) {
        Backbone.history.start()
        if (self.getCurrentRoute() === '') {
          gc.trigger('pubs:list')
        }
      }
    })
    gc.trigger('headers:list')
    gc.trigger('sidebar:show:welcome')
  }
})

var Platform = new App()
window.Platform = Platform
Platform.Behaviors = Behaviors

export {Platform}


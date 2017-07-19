import Layout from './theme/layout/layout'
import {gc} from './components/radio'

var pub = new Platform.Entities.Pubs.Pub({
  contributor: 'Sam',
  published: true
})

var App = Marionette.Application.extend({
  el: 'body',
  region: '#app',

  initialize: function() {
    this.Regions = new Layout()    
  },

  onBeforeStart: function() {
  },

  onStart: function() {
    pub.save()
    gc.request('user:init')
    gc.trigger('headers:list')

    if (Backbone.history) {
      Backbone.history.start()
      if (this.getCurrentRoute() === '') {
        gc.trigger('pubs:list')
      }
    }
  }
})

console.log(window)

var Platform = new App()
window.Platform = Platform

export {Platform}


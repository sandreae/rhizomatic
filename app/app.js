import * as Behaviours from './entities/behaviours/form_validate'
import Layout from './theme/layout/layout'
import {gc} from './components/radio'


var App = Marionette.Application.extend({
  el: 'body',
  region: '#app',

  initialize: function() {
    this.Regions = new Layout()    
  },

  onBeforeStart: function() {
  },

  onStart: function() {
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
Platform.Behaviours = Behaviours

export {Platform}


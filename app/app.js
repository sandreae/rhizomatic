import Layout from './theme/layout'

var App = Marionette.Application.extend({
  el: 'body',
  region: '#app',

  initialize: function() {

    this.Regions = new Layout()

  },
})

console.log(window)

var Platform = new App()
window.Platform = Platform

export {Platform}


import {AboutApp} from './components/about/about_router'
import {PubsApp} from './components/pubs/pubs_app'
import {pubsRouter} from './components/pubs/pubs_router'
import {gc} from './components/radio'
import * as Entities from './entities/models/radio'

var App = Marionette.Application.extend({
  el: 'body',
  region: '#app',

  initialize: function() {

    this.navigate = function (route, options) {
      options || (options = {})
      Backbone.history.navigate(route, options)
    }

    this.getCurrentRoute = function () {
      return Backbone.history.fragment
    }
  }
})

var Platform = new App()
Platform.AboutApp = AboutApp
Platform.PubsApp = PubsApp
Platform.Entities = Entities
window.Platform = Platform
console.log(Platform)
console.log(window)

export {Platform, pubsRouter, gc}


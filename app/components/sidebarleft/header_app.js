import * as HeaderApp from './list/list_controller'
import {gc} from '../radio'

var MainHandler = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'headers:list': 'listHeaders',
    'appState:changed': 'appStateChanged',
    'sidebarleft:open': 'sidebarleftOpen',
    'sidebarleft:close': 'sidebarleftClose'
  },

  listHeaders: function() {
    HeaderApp.Controller.listHeaders()
  },

  initialize: function() {
    HeaderApp.Controller.listHeaders()
  },

  appStateChanged: function() {
  },

  sidebarleftOpen: function () {
    $('#js-sidebar-left').addClass('sidebaractive-left')
    gc.trigger('sidebar:close')
    // document.getElementById('js-sidebarleftclose').style.display = 'block'
  },

  sidebarleftClose: function () {
    $('#js-sidebar-left').removeClass('sidebaractive-left')
  },

})

HeaderApp.MainHandler = new MainHandler()

export {HeaderApp}

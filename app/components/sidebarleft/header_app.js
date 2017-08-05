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
    console.log('listheaders')
    HeaderApp.Controller.listHeaders()
  },

  initialize: function() {
    HeaderApp.Controller.listHeaders()
  },

  appStateChanged: function() {
  },

  sidebarleftOpen: function () {
    $('#js-sidebarleft').addClass('sidebaractive')
    gc.trigger('sidebar:close')
    // document.getElementById('js-sidebarleftclose').style.display = 'block'
  },

  sidebarleftClose: function () {
    $('#js-sidebarleft').removeClass('sidebaractive')
  },

})

HeaderApp.MainHandler = new MainHandler()

export {HeaderApp}

/*  var API = {

    updateUserInfo: function () {
      Header.List.Controller.updateUserInfo()
    }
  }

  Platform.on('updateUserInfo', function () {
    API.updateUserInfo()
  }) */


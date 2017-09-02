import * as Show from './show/show_controller'
import {gc} from '../radio'

var SidebarApp = {}
SidebarApp.Show = Show

var SidebarRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'sidebar:open': 'sidebarOpen',
    'sidebar:close': 'sidebarClose',
    'sidebar:show:welcome': 'showWelcome',
    'user:loggedOut': 'loggedOut',
    'sidebar:show': 'show',
    'sidebar:show:full': 'showFull'
  },

  sidebarOpen: function () {
    $('#js-sidebar-right').addClass('sidebaractive-right')
    $('.main-region').addClass('shrink-right')
    gc.trigger('sidebarleft:close')
    // document.getElementById('js-sidebarclose').style.display = 'block'
  },

  sidebarClose: function () {
    $('#js-sidebar-right').removeClass('sidebaractive-right')
    $('.main-region').removeClass('shrink-right')
  },

  show: function(view) {
    Show.Controller.show(view)
  },

  showFull: function(view) {
    Show.Controller.showFull(view)
  },

  showWelcome: function() {
    Show.Controller.showWelcome()
  },

  loggedOut: function() {
    Show.Controller.showWelcome()
    gc.trigger('sidebar:close')
    this.sidebarClose()
  }
})

SidebarApp.Radio = new SidebarRadio()

export {SidebarApp}
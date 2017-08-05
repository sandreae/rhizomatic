import layout from '../templates/layout.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: layout,

  regions: {
    'sidebarRegion': '#js-sidebar-region',
    'sidebarFull': '#js-sidebar-full',
  },

  onRender: function() {
  },

  ui: {
    homeClicked: '#js-home',
    sidebarClose: '#js-sidebarclose',
    logoutClicked: '#js-logout',
  },

  events: {
    'click @ui.homeClicked': 'homeClicked',
    'click @ui.sidebarClose': 'sidebarClose',
    'click @ui.logoutClicked': 'logoutClicked',
  },

  sidebarClose: function (e) {
    e.preventDefault()
    gc.trigger('sidebar:close')
    console.log('close clicked')
  },

  homeClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('user:home')
    gc.trigger('pubs:list')
    gc.trigger('sidebar:close')
  },

  logoutClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.request('user:logout')
  },
})

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
    backClicked: '#js-back',
    sidebarClose: '#js-sidebarclose',
    logoutClicked: '#js-logout',
  },

  events: {
    'click @ui.backClicked': 'backClicked',
    'click @ui.sidebarClose': 'sidebarClose',
    'click @ui.logoutClicked': 'logoutClicked',
  },

  sidebarClose: function (e) {
    e.preventDefault()
    gc.trigger('sidebar:close')
    console.log('close clicked')
  },

  backClicked: function (e) {
    e.stopPropagation()
    gc.trigger('user:listPubs')
    gc.trigger('pubs:list')
  },

  logoutClicked: function (e) {
    e.stopPropagation()
    gc.trigger('user:logout')
  },
})

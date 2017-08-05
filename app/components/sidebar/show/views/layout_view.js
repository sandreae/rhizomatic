import layout from '../templates/layout.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: layout,

  regions: {
    'sidebarRegion': '#js-sidebar-region1',
    'sidebarFull': '#js-sidebar-full',
  },

  ui: {
    homeClicked: '#js-home',
    logoutClicked: '#js-logout',
    sidebarOpen: '#js-sidebaropen',
  },

  events: {
    'click @ui.homeClicked': 'homeClicked',
    'click @ui.sidebarOpen': 'sidebarOpen',
    'click @ui.logoutClicked': 'logoutClicked',
  },

  sidebarClose: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('sidebar:close')
  },

  sidebarOpen: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('sidebar:open')
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

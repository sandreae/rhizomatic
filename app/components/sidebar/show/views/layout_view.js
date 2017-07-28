import layout from '../templates/layout.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: layout,

  regions: {
    'sidebarRegion': '#js-sidebar-region',
  },

  onRender: function() {
  },

  ui: {
    backClicked: '#js-back',
    sidebarClose: '#js-sidebarclose',
  },

  events: {
    'click @ui.backClicked': 'backClicked',
    'click @ui.sidebarClose': 'sidebarClose',
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
})

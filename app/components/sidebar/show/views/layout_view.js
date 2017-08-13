import layout from '../templates/layout.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: layout,

  regions: {
    'sidebarRegion1': '#js-sidebar-region1',
    'sidebarRegion2': '#js-sidebar-region2',
    'sidebarRegion3': '#js-sidebar-region3',
  },

  ui: {
    sidebarOpen: '#js-sidebar-open-right',
  },

  events: {
    'click @ui.sidebarOpen': 'sidebarOpen',
  },

  sidebarOpen: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('sidebar:open')
  },

  show: function(view) {
    this.showChildView('sidebarRegion1', view);
  },
})

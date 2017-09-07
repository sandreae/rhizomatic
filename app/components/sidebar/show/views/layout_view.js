import layout from '../templates/layout.jst'
import {gc} from '../../../radio'
import 'hammerjs'

export default Marionette.View.extend({
  className: 'js-sidebar-region',
  template: layout,

  regions: {
    'sidebarRegion1': '#js-sidebar-region1',
    'sidebarRegion2': '#js-sidebar-region2',
    'sidebarRegion3': '#js-sidebar-region3',
  },

  onRender: function() {
    var myElement = document.getElementById("js-sidebar-region")
    console.log(myElement)
    var hammertime = new Hammer(myElement);
    hammertime.on('panright', function(ev) {
      gc.trigger('sidebar:close')
    });
  },

  onChildviewAttach: function(childView) {
    $('#js-sidebar-region').localize()
  },

  onAttach: function(childView) {
    $('#js-sidebar-region').localize()
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

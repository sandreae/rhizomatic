import template from '../templates/layout.jst'
import ListView from './list_view'
import {gc} from '../../../radio'
import 'hammerjs'

export default Mn.View.extend({

  template: template,

  regions: {
    'nav-region': '#js-nav',
  },

  onRender: function() {
    var headers = gc.request('headers:get')
    this.showChildView('nav-region', new ListView({collection: headers}))
  },

  onAttach: function() {
    var myElement = document.getElementById("js-header-region")
    console.log(myElement)
    var sidebarleft = new Hammer(myElement);
    sidebarleft.on('panleft', function(ev) {
      gc.trigger('sidebarleft:close')
    });
  },


  ui: {
    sidebarleftOpen: '#js-sidebarleftopen',
    mobile: '#js-mobile',
    sidebarleftOpen: '#js-sidebarleftopen',
    sidebarOpen: '#js-sidebaropen',

  },

  events: {
    'click @ui.mobile': 'mobile',
    'click @ui.navigate': 'navigate',
    'click @ui.sidebarleftOpen': 'sidebarleftOpen',
    'click @ui.sidebarOpen': 'sidebarOpen',
  },

  sidebarleftClose: function (e) {
    e.preventDefault()
    gc.trigger('sidebarleft:close')
  },

  sidebarleftOpen: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('sidebarleft:open')
  },

  sidebarOpen: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('sidebar:open')
  }
})

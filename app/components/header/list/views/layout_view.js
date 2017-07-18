import template from '../templates/layout.jst'
import ListView from './list_view'
import {gc} from '../../../radio'

export default Mn.View.extend({

  template: template,

  regions: {
    'nav-region': '#js-nav',
  },

  onRender: function() {
    var headers = gc.request('headers:get')
    this.showChildView('nav-region', new ListView({collection: headers}))
  },

  ui: {
    sidebarOpen: '#js-sidebaropen',
    sidebarClose: '#js-sidebarclose',
    mobile: '#js-mobile',
  },

  events: {
    'click @ui.sidebarOpen': 'sidebarOpen',
    'click @ui.sidebarClose': 'sidebarClose',
    'click @ui.mobile': 'mobile',
    'click @ui.navigate': 'navigate',
  },

  sidebarOpen: function (e) {
    e.preventDefault()
    gc.trigger('sidebar:open')
    console.log('sidebar open triggered')
  },

  sidebarClose: function (e) {
    e.preventDefault()
    gc.trigger('sidebar:close')
  },

  mobile: function (e) {
    e.preventDefault()
    $(".navbarmobile").toggleClass("active")
  },

})

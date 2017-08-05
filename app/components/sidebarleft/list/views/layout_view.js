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
    console.log('close')
    gc.trigger('sidebarleft:close')
  },

  sidebarleftOpen: function (e) {
    e.preventDefault()
    e.stopPropagation()
        console.log('open')

    gc.trigger('sidebarleft:open')
  },

  sidebarOpen: function (e) {
    e.preventDefault()
    e.stopPropagation()
        console.log('open')
    gc.trigger('sidebar:open')
  }


  /* isAdmin: function(isAdmin) {
    console.log('isAdmin filter triggered')
    var list = this.getChildView('nav-region')
    var filter = function(child, index, collection) {
      return child.get('isAdmin') === 'true';
    };
    list.setFilter(filter);
  }, */
})

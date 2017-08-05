import '../scss/platform.scss';
import '../vendors/simplemde.min.css';
import '../vendors/jquery-ui-themes-1.12.1/jquery-ui.css';
import '../vendors/selectize/selectize.default.css'
import {gc} from '../../../app/components/radio'

export default Mn.View.extend({
  el: '#app',

  events: {
    'click #js-main-region': 'click',
  },

  regions: {
    'main': '#js-main-region',
    'header': '#js-header-region',
    'sidebar': '#js-sidebar-region',
    'footer': '#js-footer-region'
  },

  click: function(e) {
  	gc.trigger('sidebar:close')
  	gc.trigger('sidebarleft:close')
  }
})

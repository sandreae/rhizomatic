import '../scss/platform.scss';
import '../vendors/simplemde.min.css';
import '../vendors/jquery-ui-themes-1.12.1/jquery-ui.css';
import {gc} from '../../../app/components/radio'
import 'hammerjs'

export default Mn.View.extend({

  onAttach: function() {
    var myElement = document.getElementById("js-sidebar-region")
    var myElement = document.getElementById("js-header-region")
    console.log(myElement)
    var sidebarright = new Hammer(myElement);
    sidebarright.on('panright', function(ev) {
      gc.trigger('sidebar:close')
    });
    var sidebarleft = new Hammer(myElement);
    sidebarleft.on('panleft', function(ev) {
      gc.trigger('sidebarleft:close')
    });
  },

  el: '#app',

  events: {
    'click #js-main-region': 'click',
  },

  regions: {
    'main': '#js-main-region',
    'header': '#js-header-region',
    'sidebar': '#js-sidebar-region',
  },

  click: function(e) {
  	gc.trigger('sidebar:close')
  	gc.trigger('sidebarleft:close')
  }
})

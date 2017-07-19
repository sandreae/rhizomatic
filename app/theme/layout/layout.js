import '../css/platform.scss';
import '../css/simplemde.min.css';
import '../css/jquery-ui-themes-1.12.1/jquery-ui.css';
import {gc} from '../../../app/components/radio'

export default Mn.View.extend({
  el: '#app',
  regions: {
    'main': '#js-main-region',
    'header': '#js-header-region',
    'sidebar': '#js-sidebar-region',
    'footer': '#js-footer-region'
  },
})

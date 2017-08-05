import {gc} from '../../app/components/radio'

export default Mn.View.extend({
  el: '#app',
  regions: {
    'main': '#js-main-region',
    'header': '#js-header-region',
    'sidebar': '#js-sidebar-region',
    'footer': '#js-footer-region'
  },
})

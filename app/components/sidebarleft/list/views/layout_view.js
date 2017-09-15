import template from '../templates/layout.jst'
import ListView from './list_view'
import {gc} from '../../../radio'
import 'hammerjs'

export default Mn.View.extend({
  className: 'js-sidebar-left',
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

  onChildviewAttach: function(childView) {
    $('#js-nav').localize()
  },

  ui: {
    sidebarleftOpen: '#js-sidebarleftopen',
    mobile: '#js-mobile',
    sidebarleftOpen: '#js-sidebarleftopen',
    sidebarOpen: '#js-sidebaropen',
    translate: '.js-translate',
  },

  events: {
    'click @ui.mobile': 'mobile',
    'click @ui.navigate': 'navigate',
    'click @ui.sidebarleftOpen': 'sidebarleftOpen',
    'click @ui.sidebarOpen': 'sidebarOpen',
    'click @ui.translate': 'translate',
  },

  translate: function(e) {
    e.preventDefault()
    var key = e.target.text
    $.i18n.changeLanguage(key)
    $('#js-main-region').localize()
    $('#js-sidebar-region').localize()
    $('#js-header-region').localize()
    console.log($.i18n.t('headings.rhizomatic'))
    alertify.defaults.glossary.title = $.i18n.t('headings.rhizomatic');
    alertify.defaults.glossary.ok = $.i18n.t('buttons.ok');
    alertify.defaults.glossary.cancel = $.i18n.t('buttons.cancel');
    alertify.alert().destroy()
    alertify.confirm().destroy()
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

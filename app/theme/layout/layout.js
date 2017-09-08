import '../scss/platform.scss';
import '../vendors/simplemde.min.css';
import '../vendors/jquery-ui-themes-1.12.1/jquery-ui.css';
import {gc} from '../../../app/components/radio'
import i18next from 'i18next';
import jqueryI18next from 'jquery-i18next'
import translation from '../../theme/translations/en.json'

export default Mn.View.extend({

  el: '#app',

  initialize: function() {
    i18next.init({
      lng: 'en',
      debug: true,
      fallbackLng: ['en', 'jp'],
      resources: translation
    }, function(err, t) {
      console.log('i18n initialized')
    })

    jqueryI18next.init(i18next, $, {
      tName: 't', // --> appends $.t = i18next.t 
      i18nName: 'i18n', // --> appends $.i18n = i18next 
      handleName: 'localize', // --> appends $(selector).localize(opts); 
      selectorAttr: 'data-i18n', // selector for translating elements 
      targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself) 
      optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true 
      useOptionsAttr: false, // see optionsAttr 
      parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text 
    });
    alertify.defaults.glossary.title = i18next.t('headings.rhizomatic');
    alertify.defaults.glossary.ok = i18next.t('buttons.ok');
    alertify.defaults.glossary.cancel = i18next.t('buttons.cancel');
  },

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

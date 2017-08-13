import template from '../templates/buttons.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  template: template,

  events: {
    'click button.js-login': 'loginClicked',
    'click button.js-new-user': 'newClicked'
  },

  ui: {
    homeClicked: '#js-home',
    logoutClicked: '#js-logout',
  },

  events: {
    'click @ui.homeClicked': 'homeClicked',
    'click @ui.logoutClicked': 'logoutClicked',
  },

  homeClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('pubs:list')
    gc.trigger('sidebar:close')
  },

  logoutClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.request('user:logout')
  },
})

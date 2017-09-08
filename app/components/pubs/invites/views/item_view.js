import template from '../templates/item.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  tagName: 'tr',
  template: template,

  modelEvents: {
    'change': 'render'
  },

  // when the views DOM element is clicked call 'highlightName'//
  events: {
    'click a.js-show-pub': 'showClicked',
    'click a.js-reject-pub': 'rejectClicked',
    'click a.js-respond-pub': 'respondClicked',
    'click a.js-invited-pub': 'pubClicked',

  },

  rejectClicked: function (e) {
    var self = this
    e.preventDefault()
    e.stopPropagation()
    alertify.confirm($.i18n.t('alertify.remove-invite'),
    function(){
      self.trigger('reject:invite', self.model)
      alertify.success($.i18n.t('alertify.invite-removed'))
    },
    function(){
      alertify.error($.i18n.t('alertify.invite-not-removed'))
    });
  },

  showClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('show clicked')
  },

  pubClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('pub:show', this.model.get('invitedByPubId'))
  },

  respondClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    this.trigger('accept:invite', this.model)
  },


})

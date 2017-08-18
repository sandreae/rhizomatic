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

  },

  rejectClicked: function (e) {
    var self = this
    e.preventDefault()
    e.stopPropagation()
    var answer = confirm('Do you want to reject?')
    if (answer) {
      self.trigger('reject:invite', this.model)
    }
  },

  showClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('show clicked')
  },

  respondClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('respond clicked')
    console.log(this.model)
    this.trigger('accept:invite', this.model)
  },


})

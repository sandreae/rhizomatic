import template from './item.jst'

var View = Marionette.View.extend({
  template: template,

  events: {
    'click a.js-show-more-button': 'showMore',
  },

  showMore: function (e) {
    e.preventDefault()
    e.stopPropagation()
    $('.js-show-more-content').addClass('show')
  },
})

export {View}

import template from '../templates/list.jst'
import ItemView from './item_view'

var ListView = Marionette.CollectionView.extend({
  tagName: 'table',
  className: 'table table-hover',
  template: template,
  childView: ItemView,
  childViewContainer: 'tbody',
  events: {

    'click button.js-new-user': 'newClicked'
  },

  newClicked: function(e) {
    e.preventDefault()
    this.trigger('user:new')
  }
})

export {ListView}

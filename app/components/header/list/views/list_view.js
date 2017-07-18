import template from '../templates/list.jst'
import ItemView from './item_view'

export default Marionette.CollectionView.extend({
  template: template,
  childView: ItemView,
  tagName: 'ul',

  collectionEvents: {
  'change': function() {
    this.render()
    }
  },

})

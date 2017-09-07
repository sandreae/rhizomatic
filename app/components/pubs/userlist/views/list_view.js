import template from '../templates/list.jst'
import ItemView from './item_view'
import {gc} from '../../../radio'

var TableBody = Mn.CollectionView.extend({
  tagName: 'tbody',
  childView: ItemView,
  collectionEvents: {
    'change': 'render'
  },
});

var TableView = Mn.View.extend({
  tagName: 'table',
  className: 'table',
  template: template,

  regions: {
    body: {
      el: 'tbody',
      replaceElement: true
    }
  },

  events: {
    'click button.js-new-pub': 'newClicked'
  },

  newClicked: function(e) {
    e.preventDefault()
    gc.trigger('pub:new')
  },

  onRender: function() {
    this.showChildView('body', new TableBody({
      collection: this.collection
    }));
  },
});

export {TableView}
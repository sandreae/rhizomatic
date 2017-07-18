import template from '../templates/list_template.jst'
import ItemView from './item_view'

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

  onRender: function() {
    this.showChildView('body', new TableBody({
      collection: this.collection,

      filter: function (child, index, collection) {
        return child.get('published') === 'true';
      },

    }));
  }
});

export {TableView}
import template from '../templates/list_template.jst'
import ItemView from './item_view'
import AdminItemView from './admin_item_view'
import {gc} from '../../../radio'

var TableBody = Mn.CollectionView.extend({
  tagName: 'tbody',

  childView: function(model, index) {
    gc.request('appState:get').then(function(appState){
      if (appState.get('isAdmin') === true) {
        return AdminItemView
      } else {
        return ItemView
      }
    })
  },

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
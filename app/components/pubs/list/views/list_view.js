import template from '../templates/list_template.jst'
import ItemView from './item_view'
import AdminItemView from './admin_item_view'
import {gc} from '../../../radio'

var TableBody = Mn.CollectionView.extend({
  tagName: 'tbody',

  childView: function(model, index) {
    var appState = gc.request('appState:get')
    if (appState.get('isAdmin') === true) {
      return AdminItemView
    } else {
      return ItemView
    }
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

  initialize: function(){
    var self = this
    gc.on('appState:changed', function(appState) {
      console.log('view recieved appState change trigger')
      self.triggerMethod('render')
    })
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
import template from '../templates/list.jst'
import ItemView from './item_view'

var TableBody = Mn.CollectionView.extend({
  tagName: 'tbody',
  childView: ItemView,

  collectionEvents: {
    'change': 'render'
  },

  childViewEvents: {
    'reject:invite': 'onChildRejectInvite',
    'accept:invite': 'onChildAcceptInvite',
  },

  onChildRejectInvite: function(invite) {
    this.triggerMethod('reject:invite', invite)
  },

  onChildAcceptInvite: function(invite) {
    console.log(invite)
    this.triggerMethod('accept:invite', invite)
  }
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
      collection: this.collection
    }));
  },
});

export {TableView}

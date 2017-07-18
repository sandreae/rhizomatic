import template from '../templates/list.jst'
import ItemView from './item_view'
import {gc} from '../../../radio'

var TableBody = Mn.CollectionView.extend({
  tagName: 'tbody',
  childView: ItemView,
  collectionEvents: {
    'change': 'render'
  },
  childViewEvents: {
    'showClicked': 'showClicked',
    'deleteClicked': 'deleteClicked',
    'editPubDetails': 'editPubDetails',
    'editPubContent': 'editPubContent',
    'publishClicked': 'publishClicked'
  },

  // using e.target gives us the DOM element that triggered this event function//
  // wrapping it in $() turns it into a jQuery object//
  // console.log($(e.target).text())

  // this.$el returns a jQuery object wrapping the views DOM element//
  // in this case, that is <tr>//
  // this event function should be in the 'view' because it changes the display, not data//

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
import template from '../templates/list_template.jst'
import ItemView from './item_view'

console.log(template)

var TableBody = Mn.CollectionView.extend({
  tagName: 'tbody',
  childView: ItemView
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
  }
});

export {TableView}
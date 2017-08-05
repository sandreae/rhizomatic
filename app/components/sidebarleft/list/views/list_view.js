import template from '../templates/list.jst'
import ItemView from './item_view'
import {gc} from '../../../radio'

export default Marionette.CollectionView.extend({
  template: template,
  childView: ItemView,
  tagName: 'ul',

  initialize: function(){
    var self = this
    gc.on('appState:changed', function(appState){
      self.appStateChanged(appState)
    })
  },

  appStateChanged: function(appState) {
  	var self = this
  	var filter = function(child, index, collection) {
  	  return child.get('admin') === false;
	};
    if (appState.get('isAdmin') === true){
      	self.removeFilter({ preventRender: false })}
    else
      {self.setFilter(filter, { preventRender: false })}
  },
  
  filter: function (child, index, collection) {
    return child.get('admin') === false;
  },

  collectionEvents: {
  'change': function() {
    this.render()
    }
  },
})

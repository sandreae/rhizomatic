import template from '../templates/item.jst'
import {gc} from '../../../radio'

export default Marionette.View.extend({
  tagName: 'tr',
  template: template,

  modelEvents: {
    'change': 'render'
  },
  // when the views DOM element is clicked call 'highlightName'//
  events: {
    'click a.js-show-pub': 'showClicked',
    'click a.js-delete-pub': 'deleteClicked',
  },

  deleteClicked: function (e) {
    var self = this
    e.preventDefault()
    e.stopPropagation()

    alertify.confirm('Rhizomatic', 'Delete this publication?',
      function(){
        self.remove()
        self.model.destroy()
        alertify.success('publication deleted');
      },
      function(){
        alertify.error('publication not deleted');
      });
  },

  showClicked: function (e) {
    e.preventDefault()
    e.stopPropagation()
    gc.trigger('pub:content:edit', this.model.get('_id'))
  },

  remove: function () {
    var self = this
    this.$el.fadeOut(function () {
      Marionette.View.prototype.remove.call(self)
    })
  },

})

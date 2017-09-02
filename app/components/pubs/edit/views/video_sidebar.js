import template from './../../../../entities/behaviors/templates/details.jst'

var VideoSidebar = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked',
    'change select.js-select': 'submitClicked',
    'click button.js-preview': 'previewClicked',
  },

  behaviors: {
    validate: Platform.Behaviors.FormValidate,
    tagsautocomplete: Platform.Behaviors.TagsAutocomplete,
    atautocomplete: Platform.Behaviors.AtAutocomplete,
    namesautocomplete: Platform.Behaviors.NamesAutocomplete,
  },

  onDomRefresh: function() {
    this.triggerMethod('tagsautocomplete', this.model.get('tags'))
    this.triggerMethod('atautocomplete', this.model.get('directedAt'))
    this.triggerMethod('namesautocomplete', this.model.get('contributor'))
  },

  submitClicked: function(e) {
    e.preventDefault()
    console.log(this.model.get('published'))
    var data = Backbone.Syphon.serialize(this);
    var content = $('#myUrl').val();
    if (this.model.get('published') === 'true') {
      console.log('already published')
      this.trigger('silent:save', content, data, this.model)
    } else {
      this.trigger('form:submit', content, data, this.model)
    }
  },

  previewClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var content = $('#myUrl').val();
    this.trigger('silent:save', content, data, this.model)
  },

  publishClicked: function(e) {
    e.preventDefault()
    this.model.set({published: true})
    this.submitClicked(e)
  },
})

export {VideoSidebar}

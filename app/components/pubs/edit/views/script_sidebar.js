import template from './../../../../entities/behaviors/templates/details.jst'

var ScriptSidebar = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked',
    'click button.js-update': 'updateUrl'
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
    var data = Backbone.Syphon.serialize(this);
    console.log(data)
    var drafts = this.model.get('drafts')
    var draft = drafts.findWhere({type: 'script'})
    var content = draft.get('content')
    console.log(drafts)
    this.trigger('form:submit', content, data, this.model)

    //nvar data = Backbone.Syphon.serialize(this);
    //  this.trigger('form:submit', data);
  },

  publishClicked: function(e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },
})

export {ScriptSidebar}
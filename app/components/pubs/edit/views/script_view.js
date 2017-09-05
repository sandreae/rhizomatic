import template from '../templates/script.jst'

  var Script = Marionette.View.extend({
    className: 'edit-container',
    template: template,

    onAttach: function () {
      var drafts = this.model.get('drafts')
      var draft = drafts.findWhere({type: 'url'})
      var urlInput = $( "#js-url")
      var descriptionInput = $( "#js-description")
      var content = draft.get('content')
      urlInput.val(content.url)
      descriptionInput.val(content.description)
    },
  })
export {Script}

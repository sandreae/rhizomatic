import template from '../templates/script.jst'

  var Script = Marionette.View.extend({
    template: template,

    onAttach: function () {
      var drafts = this.model.get('drafts')
      var draft = drafts.findWhere({type: 'url'})
      var urlInput = $( "#js-url")
      urlInput.val(draft.get('content'))
    },
  })
export {Script}

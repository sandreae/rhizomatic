import template from '../templates/script.jst'

  var Script = Marionette.View.extend({
    template: template,

    onAttach: function () {
      var model = this.model
      var drafts = this.model.get('drafts')
      console.log(drafts)
      var draft = drafts.findWhere({type: 'url'})
      var urlInput = $( "#js-url")
      urlInput.val(draft.get('content'))
      urlInput.keyup(function() {
        var content = urlInput.val();
        model.get('drafts').findWhere({type: 'url'}).set({content: content})
      });
    },
  })
export {Script}

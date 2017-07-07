Platform.module('EditApp.Edit.Mixed', function(Mixed, Platform, Backbone, Marionette, $, _){
  // this is the view for editing publication content//

  Mixed.Pub = Marionette.ItemView.extend({
    template: '#pub-edit-mixed',

    events: {
      'click button.js-submit': 'submitClicked'
    },

    onShow: function () {
      var element = $('#simplemde').get(0)
      var editor = new SimpleMDE({ element: element})
      $('#simplemde').data({editor: editor})
    },

    submitClicked: function (e) {
      e.preventDefault()
      // serialize the form data//
      var simplemde = $("#simplemde").data('editor')
      var content = simplemde.value()
      var renderedHTML = simplemde.options.previewRender(content)
      this.trigger('form:submit', content)

      //this.trigger('form:submit', content)
    }
  })
})

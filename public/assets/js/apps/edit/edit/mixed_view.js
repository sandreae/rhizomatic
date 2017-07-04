Platform.module('EditApp.Edit.Mixed', function(Mixed, Platform, Backbone, Marionette, $, _){
  // this is the view for editing publication content//

  Mixed.Pub = Marionette.ItemView.extend({
    template: '#pub-edit-mixed',

    events: {
      'click button.js-submit': 'submitClicked'
    },

    submitClicked: function (e) {
      e.preventDefault()
      // serialize the form data//
      var content = this.$('#summernote').summernote('code')
      this.trigger('form:submit', content)
    },

    onShow: function () {
      var content = this.model.get('activeContent')
      this.$('#summernote').summernote({
        height: 300,                 // set editor height
        minHeight: null,             // set minimum height of editor
        maxHeight: null,             // set maximum height of editor
        focus: true                  // set focus to editable area after initializing summernote
      })
      this.$('#summernote').summernote('code', content)
    }
  })
})

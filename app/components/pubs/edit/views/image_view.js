import template from '../templates/image.jst'

var Image = Marionette.View.extend({
    template: template,

    onAttach: function () {
      var self = this
      this.$('#my-dropzone').dropzone({
        paramName: 'file',
        maxFilesize: 20, // MB
        maxFiles: 1,
        dictDefaultMessage: 'Drag an image here to upload, or click to select one',
        acceptedFiles: 'image/*',
        autoProcessQueue: false,

        init: function () {
          var myDropzone = this
          self.$('button.js-submit').click(function () {
            myDropzone.processQueue()
          })
          this.on('success', function (file, resp) {
            self.trigger('form:submit', resp.filename)
          })
        }
      })
    }
  })
 export {Image}

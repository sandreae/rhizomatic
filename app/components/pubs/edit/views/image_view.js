import template from '../templates/image.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'

var Image = Marionette.View.extend({
    template: template,

    onAttach: function () {




    this.$("#draggable").draggable()
    this.$( "#resizable" ).resizable();

    var self = this
    var token = gc.request('user:getKey')

      var manualUploader = new qq.FineUploader({
            element: document.getElementById('fine-uploader-manual-trigger'),
            template: 'qq-template-manual-trigger',
            request: {
                endpoint: '/uploads',
                customHeaders: {
                  'x-access-token': token
                }
            },
            thumbnails: {
                placeholders: {
                    waitingPath: '/source/placeholders/waiting-generic.png',
                    notAvailablePath: '/source/placeholders/not_available-generic.png'
                }
            },
            autoUpload: false,
            debug: true,
            callbacks: {
              onComplete: function(id, name, response) {
              console.log(response.url) // prints "bar"
              var content = response.url
              self.trigger('form:submit', content)
            },
          }
        });

        qq(document.getElementById("trigger-upload")).attach("click", function() {
            manualUploader.uploadStoredFiles();
        });
    }
  })
 export {Image}

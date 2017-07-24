import template from '../templates/image_sidebar.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'

var ImageSidebar = Marionette.View.extend({
    template: template,

    onAttach: function () {

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
              console.log(response) // prints "bar"
              if (response.success !== false){
                var resizable = document.createElement("img")
                resizable.style.width = "100%"
                resizable.style.height = "100%"
                resizable.src = "http://localhost:3000/" + response.url
                var draggable = document.createElement("div")
                draggable.style.width = "200px"
                draggable.style.height = "200px"
                draggable.style.display = "inline-block"
                var destinationParent = document.getElementById('container')
                draggable.appendChild(resizable)
                destinationParent.appendChild(draggable)
                draggable.id = "draggable"
                resizable.id = "resizable"
                $(draggable).draggable()
                $(resizable).resizable()
              }
            },
          }
        });

        qq(document.getElementById("trigger-upload")).attach("click", function() {
            manualUploader.uploadStoredFiles();
        });
    }
  })
 export {ImageSidebar}

import template from '../templates/collage.jst'
import 'jquery-ui'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'fine-uploader/fine-uploader/fine-uploader-new.css'

var Collage = Marionette.View.extend({
    template: template,

  onAttach: function () {

    var self = this
    var token = gc.request('user:getKey')
    $( ".draggable" ).draggable()
    $( ".resizable" ).resizable()

    var uploadImage = new qq.FineUploader({
      element: document.getElementById('fine-uploader-image'),
      template: 'qq-template-manual-trigger-images',
      request: {
        endpoint: '/uploads',
        customHeaders: {
          'x-access-token': token
        }
      },
      autoUpload: true,
      callbacks: {

        onComplete: function(id, name, response) {

          if (response.success !== false) {
            var resizable = document.createElement('img')
            var draggable = document.createElement('div')
            $(resizable).css({width: '100%', height: '100%'});
            resizable.className = 'resizable'
            resizable.src = response.url
            $(draggable).css({width: '200px', height: '200px', display: 'inline-block', position: 'absolute'});
            draggable.className = 'draggable'
            draggable.appendChild(resizable)
            document.getElementById('draggable-container').appendChild(draggable)
            $('.draggable').draggable()
            $('.resizable').resizable()
          } else {console.log('error uploading file')}
        },
      }
    });

    var audioUpload = new qq.FineUploader({
      element: document.getElementById('fine-uploader-audio'),
      template: 'qq-template-manual-trigger-audio',
      request: {
        endpoint: '/uploads',
        customHeaders: {
          'x-access-token': token
        }
      },
      autoUpload: true,
      callbacks: {

        onComplete: function(id, name, response) {
          if (response.success !== false) {
            var sound = document.createElement('audio');
            sound.className = 'draggable'
            sound.style.position = 'absolute'
            sound.controls = 'controls';
            sound.src = response.url;
            sound.type = 'audio/mpeg';
            document.getElementById('draggable-container').appendChild(sound);
            $('.draggable').draggable()
          } else {console.log('error uploading file')}
        },
      }
    });
  },
})
export {Collage}

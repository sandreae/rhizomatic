import template from '../templates/audio.jst'
import {gc} from '../../../radio'
import qq from 'fine-uploader'
import 'fine-uploader/fine-uploader/fine-uploader-new.css'

var Audio = Marionette.View.extend({
  template: template,
  events: {
    'click button.js-submit': 'submitClicked'
  },

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
      autoUpload: false,
      callbacks: {

        onComplete: function(id, name, response) {
          if (response.success !== false) {
            var drafts = self.model.get('drafts')
            var draft = drafts.findWhere({type: 'audio'})
            var content = draft.get('content')
            content.unshift(response.url)
            draft.set({content: content})
          } else {console.log('error uploading file')}
        },
      }
    });
    qq(document.getElementById('trigger-upload')).attach('click', function() {
      manualUploader.uploadStoredFiles();
    });
  },
})
export {Audio}

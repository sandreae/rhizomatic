import template from '../templates/image.jst'
import {gc} from '../../../radio'
import qq from 'fine-uploader'
import 'fine-uploader/fine-uploader/fine-uploader-new.css'

var Image = Marionette.View.extend({
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
      autoUpload: true,
      callbacks: {

        onComplete: function(id, name, response) {
          var model = this.model
          if (response.success !== false) {
            var drafts = self.model.get('drafts')
            var draft = drafts.findWhere({type: 'image'})
            var content = draft.get('content')
            content.unshift(response.url)
            console.log(content)
            model.get('drafts').findWhere({type: 'image'}).set({content: content})
          } else {console.log('error uploading file')}
        },
      }
    });
  },
})
export {Image}

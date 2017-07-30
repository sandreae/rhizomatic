import template from '../templates/audio_sidebar.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'
import 'fine-uploader/fine-uploader/fine-uploader-new.css'

var AudioSidebar = Marionette.View.extend({
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked'
  },

  behaviors: {
    validate: Platform.Behaviours.FormValidate,
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
            if (Array.isArray(content) === false) {content = []}
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

  submitClicked: function(e) {
    console.log('submitClicked')
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var drafts = this.model.get('drafts')
    console.log(drafts)
    var draft = drafts.findWhere({type: 'audio'})
    var content = draft.get('content')
    this.trigger('form:submit', content, data, this.model)
  },

  publishClicked: function (e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },
})
export {AudioSidebar}

import template from '../templates/audio.jst'
import {gc} from '../../../radio'

var Audio = Marionette.View.extend({
  template: template,
  events: {
    'click button.js-submit': 'submitClicked'
  },

onAttach: function () {
    var model = this.model
    document.getElementById("file-input").onchange = () => {
      alertify.message('uploading, please wait')
      const files = document.getElementById('file-input').files;
      const file = files[0];
      if(file == null){
        return alertify.error('no file selected')
      }
      this.getSignedRequest(file, model);
    };
  },

  getSignedRequest: function(file, model) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          this.uploadFile(file, response.signedRequest, response.url, model);
        }
        else {
          alertify.error('sorry, upload failed')
        }
      }
    };
    xhr.send();
  },

  uploadFile: function(file, signedRequest, url, model){
    console.log(model)
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          alertify.success('uploading complete')
          var player = document.getElementById('js-audio-player')
          var audiofile = document.getElementById('js-audio-file')
          audiofile.src = url
          player.load();
          model.get('drafts').findWhere({type: 'audio'}).set({content: url})
        }
        else{
          alertify.error('sorry, upload failed')
        }
      }
    };
    xhr.send(file)
  }
})
export {Audio}

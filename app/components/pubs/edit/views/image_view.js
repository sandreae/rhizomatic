import template from '../templates/image.jst'
import {gc} from '../../../radio'

var Image = Marionette.View.extend({
  className: 'edit-container',
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
    var pubTitle = model.get('title')
    var pubId = model.get('_id')
    var fileName = pubId + '_' + pubTitle + '_' + file.name
    xhr.open('GET', `/sign-s3?file-name=${fileName}&file-type=${file.type}`);
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
    console.log(url)
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    var progressBar = document.getElementById("progress")
    progressBar.style.display = 'block'
    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        progressBar.max = e.total;
        progressBar.value = e.loaded;
      }
    }
    xhr.upload.onloadstart = function (e) {
      progressBar.value = 0;
    }
    xhr.upload.onloadend = function (e) {
      progressBar.value = e.loaded;
    }
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          alertify.success($.i18n.t('alertify.upload-success'))
          document.getElementById('js-image-preview').src = url;
          var content = model.get('drafts').findWhere({type: 'image'})
          content = {}
          content.url = url
          model.get('drafts').findWhere({type: 'image'}).set({content: content})
          progressBar.style.display = 'none'
        }
        else{
          alertify.error($.i18n.t('alertify.upload-failed'))
        }
      }
    };
    xhr.send(file);
  }

})
export {Image}

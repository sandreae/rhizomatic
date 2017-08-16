import template from '../templates/image.jst'
import {gc} from '../../../radio'

var Image = Marionette.View.extend({
  template: template,
  events: {
    'click button.js-submit': 'submitClicked'
  },

  onAttach: function () {
    var model = this.model
    document.getElementById("file-input").onchange = () => {
      const files = document.getElementById('file-input').files;
      const file = files[0];
      if(file == null){
        return alert('No file selected.');
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
          alert('Could not get signed URL.');
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
          document.getElementById('avatar-url').value = url;
          model.get('drafts').findWhere({type: 'image'}).set({content: url})
        }
        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file);
  }

})
export {Image}

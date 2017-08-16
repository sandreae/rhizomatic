import template from '../templates/collage.jst'
import {gc} from '../../../radio'
import 'jquery-ui'

var Collage = Marionette.View.extend({
    template: template,

onAttach: function () {
    $( ".draggable" ).draggable()
    $( ".resizable" ).resizable()

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
  	var self = this
    console.log(model)
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          document.getElementById('avatar-url').value = url;
          if (file.type.includes('image'))
			{
		    var resizable = document.createElement('img')
            var draggable = document.createElement('div')
            $(resizable).css({width: '100%', height: '100%'});
            resizable.className = 'resizable'
            resizable.src = url
            $(draggable).css({width: '200px', height: '200px', display: 'inline-block', position: 'absolute'});
            draggable.className = 'draggable'
            draggable.appendChild(resizable)
            document.getElementById('draggable-container').appendChild(draggable)
            $('.draggable').draggable()
            $('.resizable').resizable()
			}

			if (file.type.includes('audio')){
		    var sound = document.createElement('audio');
            sound.className = 'draggable'
            sound.style.position = 'absolute'
            sound.controls = 'controls';
            sound.src = url;
            sound.type = 'audio/mpeg';
            document.getElementById('draggable-container').appendChild(sound);
            $('.draggable').draggable()
			}
	        }
	        else{
          alert('Could not upload file.');
        }
      }
    };
    xhr.send(file)
  },
})
export {Collage}

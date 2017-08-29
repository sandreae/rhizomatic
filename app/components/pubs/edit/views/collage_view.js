import template from '../templates/collage.jst'
import {gc} from '../../../radio'
import 'jquery-ui'

var Collage = Marionette.View.extend({
    template: template,

  events: {
    'change input.myUrl': 'urlChanged',
    'click a.textBoxClick': 'createTextBox',
    'click a.remove-button': 'removeElement',
  },

  onAttach: function () {
    $('.draggable').draggable({
      iframeFix: true
    });    
    $( ".resizable" ).resizable()

    var model = this.model

    document.getElementById("file-input").onchange = () => {
      alertify.message('uploading file')
      const files = document.getElementById('file-input').files;
      const file = files[0];
      if(file == null){
        return alertify.error('no file selected')
      }
      this.getSignedRequest(file, model);
    };
    $('#textBox').contentEditable = true
	$('.draggable p').click(function() {
	    $(this).focus();
	});
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
  	var self = this
  	var remove = document.createElement('a')
  	remove.setAttribute('href', '#');
    remove.innerHTML = 'x'
    remove.className = 'remove-button'
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
        	alertify.success('uploading complete')
          if (file.type.includes('image')){
			    var resizable = document.createElement('img')
	            var draggable = document.createElement('div')
	            $(resizable).css({width: '100%', height: '100%'});
	            resizable.className = 'resizable'
	            resizable.src = url
	            $(draggable).css({width: '200px', height: '200px', display: 'inline-block', position: 'absolute'});
	            draggable.className = 'draggable'
	            draggable.appendChild(remove)
	            draggable.appendChild(resizable)
	            document.getElementById('draggable-container').appendChild(draggable)
	            $('.draggable').draggable()
	            $('.resizable').resizable()
			}

			if (file.type.includes('audio')){
	            var draggable = document.createElement('div')
			    var sound = document.createElement('audio');
	            sound.className = 'draggable'
	            sound.style.position = 'absolute'
	            sound.controls = 'controls';
	            sound.src = url;
	            sound.type = 'audio/mpeg';
	            $(draggable).css({width: '200px', height: '80px', display: 'inline-block', position: 'absolute'});
	            draggable.className = 'draggable'
	            draggable.appendChild(remove)
	            draggable.appendChild(sound)
	            document.getElementById('draggable-container').appendChild(draggable);
	            $('.draggable').draggable()
				}
	        }
	        else{
          alertify.error('sorry, upload failed')
        }
      }
    }
    xhr.send(file)
  },

  createVideoFrame: function(){
  	var remove = document.createElement('a')
  	remove.setAttribute('href', '#');
    remove.innerHTML = 'x'
    remove.className = 'remove-button'
    console.log('create video')
	var resizable = document.createElement('div')
    var draggable = document.createElement('div')
    var videoFrame = document.createElement('div')
    $(resizable).css({width: '100%', height: '100%'});
    resizable.className = 'resizable'
    $(draggable).css({width: '200px', height: '200px', display: 'inline-block', position: 'absolute'});
    draggable.className = 'draggable'
    videoFrame.className = 'videoFrame'
    draggable.appendChild(remove)
    draggable.appendChild(resizable)
    resizable.appendChild(videoFrame)
    document.getElementById('draggable-container').appendChild(draggable)
    $('.draggable').draggable({
      iframeFix: true
    });
    $('.resizable').resizable();
    $('.videoFrame').attr({id: 'myCode'})
  },

  createTextBox: function(){
  	var remove = document.createElement('a')
  	remove.setAttribute('href', '#');
    remove.innerHTML = 'x'
    remove.className = 'remove-button'
	var resizable = document.createElement('div')
    var draggable = document.createElement('div')
    var textBox = document.createElement('p')
    var textBoxContainer = document.createElement('div')
    $(resizable).css({width: '100%', height: '100%'});
    resizable.className = 'resizable'
    $(draggable).css({width: '200px', height: '200px', display: 'inline-block', position: 'absolute'});
    draggable.className = 'draggable'
    textBox.className = 'textBox-content'
    textBoxContainer.className = 'textBox-container'
    draggable.appendChild(remove)
    draggable.appendChild(resizable)
    resizable.appendChild(textBoxContainer)
    textBoxContainer.appendChild(textBox)
    document.getElementById('draggable-container').appendChild(draggable)
    $(draggable).draggable({
      cancel: null
    });
    $(resizable).resizable()
    $(textBox).attr({id: 'textBox'})
    textBox.contentEditable = true;
	$('.draggable p').click(function() {
	    $(this).focus();
	});
  },

  urlChanged: function(e){
  	e.preventDefault()
  	console.log(document.getElementById('myCode'))
  	if(document.getElementById('myCode') === null){this.createVideoFrame()}
    var myId;
    var myUrl = $('#myUrl').val();
    myId = this.getId(myUrl);
    var embed = '<iframe src="//www.youtube.com/embed/' + myId + '?showinfo=0" frameborder="0" allowfullscreen></iframe>'
    $('#myCode').html(embed);
  },

  getId: function(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
  },

  removeElement: function(e) {
  	console.log('remove element triggered')
   	e.preventDefault()
  	console.log(e)
  	$(e.target.parentElement).remove()
  }
})
export {Collage}

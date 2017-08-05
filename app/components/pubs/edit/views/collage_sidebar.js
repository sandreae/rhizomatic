import template from '../templates/collage_sidebar.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'
import 'fine-uploader/fine-uploader/fine-uploader-new.css'

var CollageSidebar = Marionette.View.extend({
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked'
  },

 behaviors: {
    validate: Platform.Behaviours.FormValidate,
    tagsautocomplete: Platform.Behaviours.TagsAutocomplete,
  },

  onDomRefresh: function() {
    this.triggerMethod('tagsautocomplete', this.model.get('tags'))
  },

  onAttach: function () {

    var self = this
    var token = gc.request('user:getKey')

    var uploadImage = new qq.FineUploader({
      element: document.getElementById('fine-uploader-image'),
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

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    $( ".draggable" ).draggable( "destroy" )
    $( ".resizable" ).resizable( "destroy" )
    var container = $('#draggable-container')
    var content = $(container).html()
    this.trigger('form:submit', content, data, this.model)
  },

  publishClicked: function (e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },
})
export {CollageSidebar}

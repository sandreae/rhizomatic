import template from '../templates/image_sidebar.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'
import 'fine-uploader/fine-uploader/fine-uploader-new.css'

var ImageSidebar = Marionette.View.extend({
    template: template,

    events: {
      'click button.js-submit': 'submitClicked',
      'click button.js-publish': 'publishClicked'
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
      thumbnails: {
        placeholders: {
          waitingPath: '/source/placeholders/waiting-generic.png',
          notAvailablePath: '/source/placeholders/not_available-generic.png'
        }
      },
      autoUpload: false,
      debug: true,
      callbacks: {
        onComplete: function(id, name, response) {

          if (response.success !== false) {
            var resizable = document.createElement('img')
            resizable.style.width = '100%'
            resizable.style.height = '100%'
            resizable.src = 'http://localhost:3000/' + response.url
            var draggable = document.createElement('div')
            draggable.style.width = '200px'
            draggable.style.height = '200px'
            draggable.style.display = 'inline-block'
            draggable.appendChild(resizable)
            var destinationParent = document.getElementById('draggable-container')
            destinationParent.appendChild(draggable)
            $(draggable).draggable()
            $(resizable).resizable()
          } else {console.log('error uploading file')}
        },
      }
    });
    qq(document.getElementById('trigger-upload')).attach('click', function() {
      manualUploader.uploadStoredFiles();
    });
  },

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var container = $('#draggable-container')
    var content = $(container).html()
    this.trigger('form:submit', content, data, this.model)
  },

  onFormDataInvalid: function(errors) {
    console.log(errors)
    var $view = this.$el;

    var clearFormErrors = function() {
      var $form = $view.find('form');
      $form.find('.help-inline.error').each(function() {
        $(this).remove();
      });
      $form.find('.control-group.error').each(function() {
        $(this).removeClass('error');
      });
    }

    var markErrors = function(value, key){
      var $controlGroup = $view.find('#pub-' + key).parent();
      var $errorEl = $('<span>', { class: 'help-inline error', text: value });
      $controlGroup.append($errorEl).addClass('error');
    }

    clearFormErrors();
    _.each(errors, markErrors);
  },

  publishClicked: function (e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },
})
export {ImageSidebar}

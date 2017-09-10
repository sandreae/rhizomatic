import template from './../../../../entities/behaviors/templates/details.jst'
import {gc} from '../../../radio'
require('webpack-jquery-ui/interactions')
require('jquery-ui-touch-punch')
import SimpleMDE from 'simplemde'

var CollageSidebar = Marionette.View.extend({
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked',
    'change select.js-select': 'submitClicked',
    'click button.js-preview': 'previewClicked',
  },

  behaviors: {
    validate: Platform.Behaviors.FormValidate,
    tagsautocomplete: Platform.Behaviors.TagsAutocomplete,
    atautocomplete: Platform.Behaviors.AtAutocomplete,
    namesautocomplete: Platform.Behaviors.NamesAutocomplete,
  },

  onDomRefresh: function() {
    this.triggerMethod('tagsautocomplete', this.model.get('tags'))
    this.triggerMethod('atautocomplete', this.model.get('directedAt'))
    this.triggerMethod('namesautocomplete', this.model.get('contributor'))
  },

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    $('#draggable-container').hide()
    $( '.draggable' ).draggable( 'destroy' )
    $( '.resizable' ).resizable( 'destroy' )
    $( '.remove-button').hide()
    var textareas = document.querySelectorAll('.textBox');
    [].forEach.call(textareas, function(textarea) {
      var simplemde = $(textarea).data('editor')
      var value = simplemde.value()
      console.log(value)
      simplemde.toTextArea();
      simplemde = null;
      $(textarea).text(value)
      $(textarea).trigger('change');
    });
    var container =  document.querySelector('#draggable-container');
    var content = container.innerHTML
    this.restore()
    if (this.model.get('published') === 'true') {
      console.log('already published')
      this.trigger('silent:save', content, data, this.model)
    } else {
      this.trigger('form:submit', content, data, this.model)
    }
  },

  previewClicked: function(e) {
    e.preventDefault()
    $('#draggable-container').hide()
    var data = Backbone.Syphon.serialize(this);
    $('.draggable').draggable('destroy')
    $('.resizable').resizable('destroy')
    $('.remove-button').hide()

    var textareas = document.querySelectorAll('.textBox');
    console.log(textareas);
    [].forEach.call(textareas, function(textarea) {
      console.log(textarea)
      var simplemde = $(textarea).data('editor')
      var value = simplemde.value()
      simplemde.toTextArea();
      simplemde = null;
      $(textarea).text(value)
      $(textarea).trigger('change');
    });
    var container =  document.querySelector('#draggable-container'); 
    var content = container.innerHTML
    this.restore()
    this.trigger('silent:save', content, data, this.model)
  },

  publishClicked: function (e) {
    e.preventDefault()
    this.model.set({published: true})
    this.submitClicked(e)
  },

  restore: function() {
    $(".remove-button").show()
    $('.draggable').draggable({
      iframeFix: true
    });    
    $( ".resizable" ).resizable({
      handles: "e"
    })

    var textareas = document.querySelectorAll('.textBox');
    [].forEach.call(textareas, function(textarea) {
    console.log(textarea.value)
      var simplemde = new SimpleMDE({ 
        element: textarea,
        spellChecker: false,
        showIcons: [],
        toolbar: false,
        toolbarTips: false,
        status: false,
      });
    $(textarea).data({editor: simplemde});
    });
    $('#draggable-container').show()
  }
})
export {CollageSidebar}

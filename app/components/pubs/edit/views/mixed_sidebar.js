import template from '../templates/mixed_sidebar.jst'

var MixedSidebar = Marionette.View.extend({

  template: template,

  events: {
    'click button.js-submit': 'submitClicked'
  },

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var simplemde = $('#simplemde').data('editor')
    var content = simplemde.value()
    var renderedHTML = simplemde.options.previewRender(content)
    this.trigger('form:submit', content, data)

    //nvar data = Backbone.Syphon.serialize(this);
    //  this.trigger('form:submit', data);
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
  }
})

export {MixedSidebar}

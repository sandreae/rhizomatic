import template from '../templates/mixed_sidebar.jst'

var MixedSidebar = Marionette.View.extend({

  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked'
  },

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var simplemde = $('#simplemde').data('editor')
    var content = simplemde.value()
    this.trigger('form:submit', content, data, this.model)

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
  },

  publishClicked: function(e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },
})

export {MixedSidebar}

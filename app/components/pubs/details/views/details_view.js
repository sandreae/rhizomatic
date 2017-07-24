import template from './..//templates/details.jst'
import 'backbone.syphon'
import 'jquery-ui'
import 'backbone-forms'

var View = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked'
  },

  onDomRefresh: function() {
    console.log('date picker shown')
    $("#pub-pubDate").datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });
  },

  submitClicked: function (e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
    },

  onFormDataInvalid: function(errors){
    console.log(errors)
    var $view = this.$el;

    var clearFormErrors = function(){
      var $form = $view.find("form");
      $form.find(".help-inline.error").each(function(){
        $(this).remove();
      });
      $form.find(".control-group.error").each(function(){
        $(this).removeClass("error");
      });
    }

    var markErrors = function(value, key){
      var $controlGroup = $view.find("#pub-" + key).parent();
      var $errorEl = $("<span>", { class: "help-inline error", text: value });
      $controlGroup.append($errorEl).addClass("error");
    }

    clearFormErrors();
    _.each(errors, markErrors);
  }
})

export {View}
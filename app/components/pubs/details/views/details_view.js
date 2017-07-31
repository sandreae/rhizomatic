import template from './..//templates/details.jst'
import {gc} from '../../../radio'
import 'backbone.syphon'
import 'jquery-ui'

var View = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked'
  },

  onDomRefresh: function() {
    $("#pub-pubDate").datepicker({
      changeMonth: true,//this option for allowing user to select month
      changeYear: true //this option for allowing user to select from year range
    });
    var appState = gc.request('appState:get')
    var tagPool = appState.get('tags')
    var contributors = appState.get('contributors')
    $('#pub-tags').autocomplete({
      source: tagPool
    })
    $('#pub-directedAt').autocomplete({
      source: contributors
    })

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
import template from '../templates/script_sidebar.jst'

var ScriptSidebar = Marionette.View.extend({
  
  template: template,

  events: {
    'click button.js-submit': 'submitClicked',
    'click button.js-publish': 'publishClicked',
    'click button.js-update': 'updateUrl'
  },

  behaviors: {
    validate: Platform.Behaviours.FormValidate,
  },

  initialize: function() {
  	var url = this.model.get('activeContent')
  	this.showIframe(url)
  },

  submitClicked: function(e) {
    e.preventDefault()
    var data = Backbone.Syphon.serialize(this);
    var content = data.url
    this.trigger('form:submit', content, data, this.model)

    //nvar data = Backbone.Syphon.serialize(this);
    //  this.trigger('form:submit', data);
  },

  publishClicked: function(e) {
    this.model.set({published: true})
    this.submitClicked(e)
  },

  updateUrl: function(e) {
  	e.preventDefault()
  	var data = Backbone.Syphon.serialize(this);
  	var url = data.url
  	this.showIframe(url)
	},

  showIframe:  function(url) {
  	$('#placeholder').empty();
	var container = document.getElementById("placeholder");
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", url)
    ifrm.style.width = "640px";
    ifrm.style.height = "480px";
    container.append(ifrm)
  }
})

export {ScriptSidebar}
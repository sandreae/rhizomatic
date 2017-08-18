import template from '../templates/video.jst'

var Video = Marionette.View.extend({
  template: template,

  events: {
    'change input.myUrl': 'urlChanged',
  },


  onAttach: function() {
    var drafts = this.model.get('drafts')
    var draft = drafts.findWhere({type: 'video'})
    var content = draft.get("content")
    $('#myUrl').val(content)
    var myId;
    myId = this.getId(content);
    var embed = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe>'
    $('#myCode').html(embed);
  },

  urlChanged: function(){
    var myId;
    var myUrl = $('#myUrl').val();
    myId = this.getId(myUrl);
    var embed = '<iframe width="560" height="315" src="//www.youtube.com/embed/' + myId + '" frameborder="0" allowfullscreen></iframe>'
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
  }
})

export {Video}



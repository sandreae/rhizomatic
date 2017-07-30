import template from '../templates/audio.jst'

  var Audio = Marionette.View.extend({
    template: template,

    initialize: function() {
      var content = this.model.get('activeContent')
      console.log(typeof content)
    },
  })
export {Audio}

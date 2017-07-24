import template from '../templates/image.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'

var Image = Marionette.View.extend({
    template: template,

    onAttach: function () {

    this.$("#draggable").draggable()
    this.$( "#resizable" ).resizable();
    }
  })
 export {Image}

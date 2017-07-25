import template from '../templates/image.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'

var Image = Marionette.View.extend({
    template: template,

    onAttach: function () {
    console.log('onAttach')
    this.$(".ui-draggable").draggable()
    this.$(".ui-resizable" ).resizable();
    }
  })
 export {Image}

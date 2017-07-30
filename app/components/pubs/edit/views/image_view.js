import template from '../templates/image.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'

var Image = Marionette.View.extend({
    template: template,

    onAttach: function () {
    $( ".draggable" ).draggable()
    $( ".resizable" ).resizable()
    // draggable.draggable('enable')
    // resizable.resizable('enable')

    }
  })
 export {Image}

import template from '../templates/collage.jst'
import qq from 'fine-uploader'
import {gc} from '../../../radio'
import 'jquery-ui'

var Collage = Marionette.View.extend({
    template: template,

    onAttach: function () {
    $( ".draggable" ).draggable()
    $( ".resizable" ).resizable()
    // draggable.draggable('enable')
    // resizable.resizable('enable')

    }
  })
 export {Collage}

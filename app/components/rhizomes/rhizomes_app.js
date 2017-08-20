import * as RhizomesApp from './new/rhizomes_controller'
import RhizomesRouter from './rhizomes_router'
import {gc} from '../radio'

var RhizomesRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'newRhizome:show': 'newRhizome',
  },

  newRhizome: function() {
    RhizomesApp.Controller.newRhizome()
    Platform.navigate('newrhizome')
  },
})

RhizomesApp.Radio = new RhizomesRadio()
RhizomesApp.Router = new RhizomesRouter({controller: RhizomesApp.Radio});

export {RhizomesApp}

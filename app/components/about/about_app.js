import * as AboutApp from './show/show_controller'
import * as HowtoApp from './howto/howto_controller'
import AboutRouter from './about_router'
import {gc} from '../radio'

var PubsRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'about:show': 'showAbout',
    'howto:show': 'showHowto'
  },

  showAbout: function() {
    AboutApp.Controller.showAbout()
    Platform.navigate('about')
  },
  showHowto: function() {
    HowtoApp.Controller.showHowto()
    Platform.navigate('howto')
  },
})

AboutApp.Radio = new PubsRadio()
AboutApp.Router = new AboutRouter({controller: AboutApp.Radio});

export {AboutApp}

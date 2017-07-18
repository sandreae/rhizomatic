import * as AboutApp from './show/show_controller'
import AboutRouter from './about_router'
import {gc} from '../radio'

var PubsRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'about:show': 'showAbout'
  },

  showAbout: function() {
    AboutApp.Controller.showAbout()
    Platform.navigate('about')
  }
})

AboutApp.Radio = new PubsRadio()
AboutApp.Router = new AboutRouter({controller: AboutApp.Radio});

export {AboutApp}

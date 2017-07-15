import * as AboutApp from './show/show_controller'
import {gc} from '../radio'

var MainHandler = Marionette.Object.extend({
  channelName: 'gc',
  radioRequests: {
    'show:about': 'showAbout'
  },

  showAbout: function() {
    AboutApp.Controller.showAbout()
    Platform.navigate('about')
  }
})

AboutApp.MainHandler = new MainHandler()

var AboutRouter = Mn.AppRouter.extend({
  controller: AboutApp.MainHandler,
  appRoutes: {
    'about': 'showAbout'
  }
});

var router = new AboutRouter();

export {AboutApp}

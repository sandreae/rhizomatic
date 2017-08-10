import Home from './views/home_view'
import {gc} from '../../radio'

var Controller = {
  showHome: function() {
    gc.request('appState:get').then(function(appState){
    	console.log('app state init', appState)
    if (appState.get('loggedIn') === true) {
      console.log('home triggered')
      var home = new Home()
      gc.trigger('sidebar:show', home)
    } else {
    	      console.log('login view triggered')

      gc.trigger('sidebar:show:login')
    }
    })

  }
}

export {Controller}

import Home from './views/home_view'
import {gc} from '../../radio'

var Controller = {
  showHome: function() {
    gc.request('appState:get').then(function(appState){
    if (appState.get('loggedIn') === true) {
      var home = new Home({
	  	templateContext: {
      isAdmin: appState.get('isAdmin'),
		  userName: appState.get('userName'),
	    } 
	  })
      gc.trigger('sidebar:show', home)
    } else {
      gc.trigger('sidebar:show:welcome')
    }
    })

  }
}

export {Controller}

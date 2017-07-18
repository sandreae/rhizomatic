import LayoutView from './views/layout_view'
import {gc} from '../../radio'


var Controller = {

  listHeaders: function() {
    var headers = new LayoutView()

    Platform.Regions.getRegion('header').show(headers)
  },

  userLoggedIn: function(){
    var links = gc.request('headers:get')
    var model = links.findWhere({id: '5'})
    model.set({
      name: 'Logout',
      url: 'logout',
      navigationTrigger: 'user:logout'
    })
  },

   userLoggedOut: function(){
      var links = gc.request('headers:get')
      links.findWhere({id: '5'}).set({
        name: 'Login',
        url: 'login',
        navigationTrigger: 'user:loginShow'
      })
    },


/*  setActiveHeader: function (headerUrl) {
    var links = gc.request('header:entities')
    var headerToSelect = links.find(function (header) { return header.get('url') === headerUrl })
    headerToSelect.select()
    links.trigger('reset')
  }, 

  updateUserInfo: function () {
    gc.request('initialize:entities').done(function () {
      gc.request('initializeUser:entities').done(function () {
        var user = gc.request('getUser:entities')
        if (user.get('userName') === undefined) {
          user.set({userName: 'visitor'})
        }
        var userInfo = new User({model: user})
        Platform.getRegion('footer').show(userInfo)
        return user
      })
    })  
  } */

}

export {Controller}

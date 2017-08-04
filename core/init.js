import * as pace from 'pace-progress'
import * as Entities from '../app/entities/models/radio'
import {Platform} from './../app/app'
import {PubsApp} from '../app/components/pubs/pubs_app'
import {AboutApp} from '../app/components/about/about_app'
import {HeaderApp} from '../app/components/header/header_app'
import {SidebarApp} from '../app/components/sidebar/sidebar_app'
import {UsersApp} from '../app/components/users/users_app'
import {Auth} from '../app/entities/authentication/authentication_router'
import {gc} from '../app/components/radio'


// import {Globals, Authentication} from './../app/entities/authentication'
pace.start()
Platform.Entities = Entities
Platform.HeaderApp = HeaderApp
Platform.AboutApp = AboutApp
Platform.PubsApp = PubsApp
Platform.SidebarApp = SidebarApp
Platform.UsersApp = UsersApp
Platform.Auth = Auth
console.log(Platform)

Platform.getCurrentRoute = function () {
  return Backbone.history.fragment
}

Platform.navigate = function (route) {
  Backbone.history.navigate(route)
}

document.addEventListener('DOMContentLoaded', () => {

  Platform.start();

})

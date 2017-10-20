if (module.hot) {
  module.hot.accept()
}

import * as Entities from './entities/models/radio'
import {Platform} from '././app'
import {PubsApp} from './components/pubs/pubs_app'
import {AboutApp} from './components/about/about_app'
import {HeaderApp} from './components/sidebarleft/header_app'
import {SidebarApp} from './components/sidebar/sidebar_app'
import {UsersApp} from './components/users/users_app'
import {RhizomesApp} from './components/rhizomes/rhizomes_app'
import {Auth} from './entities/authentication/authentication_router'
import {gc} from './components/radio'

// import {Globals, Authentication} from './../app/entities/authentication'

Platform.Entities = Entities
Platform.HeaderApp = HeaderApp
Platform.AboutApp = AboutApp
Platform.PubsApp = PubsApp
Platform.SidebarApp = SidebarApp
Platform.UsersApp = UsersApp
Platform.RhizomesApp = RhizomesApp
Platform.Auth = Auth

Platform.getCurrentRoute = function () {
  return Backbone.history.fragment
}

Platform.navigate = function (route) {
  Backbone.history.navigate(route)
}

document.addEventListener('DOMContentLoaded', () => {
  Platform.start();
})


import * as Users from './models/user'
import * as Pubs from './models/pub'
import * as Rhizomes from './models/rhizome'
import * as Headers from './models/header'
import * as AppState from './models/app'
import * as Invites from './models/invites'
import {gc} from '../../components/radio'

var Radio = Marionette.Object.extend({

  channelName: 'gc',

  //initialize: function() {
  //  gc.reply('pub:get', this.getPub);
  //},

  radioRequests: {
    'user:get': 'getUser',
    'users:get': 'getUsers',
    'pub:get': 'getPub',
    'pubs:get': 'getPubs',
    'rhizome:get': 'getRhizome',
    'rhizomes:get': 'getRhizomes',
    'invites:get': 'getInvites',
    'headers:get': 'getHeaders',
    'appState:get': 'getAppState',
    'appState:getForced': 'getAppStateForced',
  },

  getUser: function(id) {
    console.log('user:get request recieved')
    return Users.UserAPI.getUser(id)
  },

  getUsers: function() {
    console.log('users:get request recieved')
    return Users.UserAPI.getUsers()
  },

  getPub: function(id) {
    console.log('pub:get request recieved')
    return Pubs.PubAPI.getPub(id)
  },

  getPubs: function() {
    console.log('pubs:get request recieved')
    return Pubs.PubAPI.getPubs()
  },
  getRhizome: function(id) {
    console.log('rhizome:get request recieved')
    return Rhizomes.RhizomeAPI.getRhizome(id)
  },

  getInvites: function(pendingPubs) {
    console.log('invites:get request recieved')
    return Invites.InvitesAPI.getInvites(pendingPubs)
  },

  getRhizomes: function() {
    console.log('rhizomes:get request recieved')
    return Rhizomes.RhizomeAPI.getRhizomes()
  },

  getHeaders: function() {
    console.log('headers:get request recieved')
    return Headers.HeadersAPI.getHeaders()
  },
  getAppStateForced: function() {
    console.log('appState:getForced request recieved')
    return AppState.AppStateAPI.getAppStateForced()
  },
  getAppState: function() {
    console.log('appState:get request recieved')
    return AppState.AppStateAPI.getAppState()
  },
})

var Router = new Radio()

export {Users, Pubs, Rhizomes, Headers, Router, AppState}

import * as Edit from './edit/edit_controller'
import * as Show from './show/show_controller'
import * as New from './new/new_controller'
import * as List from './list/list_controller'
import * as UserList from './userlist/userlist_controller'
import * as Invites from './invites/invites_controller'
import PubsRouter from './pubs_router'
import {gc} from '../radio'

var PubsApp = {}
PubsApp.Edit = Edit
PubsApp.Show = Show
PubsApp.New = New
PubsApp.List = List
PubsApp.UserList = UserList

var PubsRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'pubs:list': 'listPubs',
    'pub:show': 'showPub',
    'pub:new': 'newPub',
    'pub:content:edit': 'editPubContent',
    'user:listPubs': 'userListPubs',
    'user:listInvites': 'userInvites'
  },

  listPubs: function() {
    List.Controller.listPubs()
    gc.trigger('user:home')
    Platform.navigate('rhizomes')
  },

  showPub: function(id) {
    Show.Controller.showPub(id)
    Platform.navigate('publication/' + id)
  },

  editPubContent: function(id) {
    Edit.Controller.editPub(id)
    Edit.Controller.editPubSidebar(id)
    Platform.navigate('publication/' + id + '/edit')
  },

  userListPubs: function() {
    UserList.Controller.userListPubs()
    Platform.navigate('user/publications')
  },

  newPub: function(invitedByContrib, invitedByPubId, user, invites, invite, rhizome) {
    New.Controller.newPub(invitedByContrib, invitedByPubId, user, invites, invite, rhizome)
    Platform.navigate('publications/new')
  },

  userInvites: function() {
    Invites.Controller.listInvites()
    Platform.navigate('user/invites')
  }
})

PubsApp.Radio = new PubsRadio()
PubsApp.Router = new PubsRouter({controller: PubsApp.Radio})

export {PubsApp}

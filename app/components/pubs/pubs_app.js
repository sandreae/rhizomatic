import * as Edit from './edit/edit_controller'
import * as Show from './show/show_controller'
import * as New from './new/new_controller'
import * as Details from './details/details_controller'
import * as List from './list/list_controller'
import * as UserList from './userlist/userlist_controller'
import * as Publish from './publish/publish_controller'
import PubsRouter from './pubs_router'
import {gc} from '../radio'

var PubsApp = {}
PubsApp.Edit = Edit
PubsApp.Show = Show
PubsApp.New = New
PubsApp.List = List
PubsApp.UserList = UserList
PubsApp.Publish = Publish

var PubsRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioEvents: {
    'pubs:list': 'listPubs',
    'pub:show': 'showPub',
    'pub:new': 'newPub',
    'pub:details:edit': 'editPubDetails',
    'pub:content:edit': 'editPubContent',
    'user:listPubs': 'userListPubs',
  },

  listPubs: function() {
    List.Controller.listPubs()
    Platform.navigate('publications')
  },

  showPub: function(id) {
    Show.Controller.showPub(id)
    UserList.Controller.userListPubs()
    Platform.navigate('publications/' + id)
  },

  editPubDetails: function(id) {
    Details.Controller.editPubDetails(id)
    Platform.navigate('publications/details/' + id)
  },

  editPubContent: function(id) {
    Edit.Controller.editPub(id)
    Edit.Controller.editPubSidebar(id)
    Platform.navigate('publications/edit/' + id)
  },

  userListPubs: function() {
    UserList.Controller.userListPubs()
  },

  newPub: function() {
    New.Controller.newPub()
    Platform.navigate('publications/new')
  }})

PubsApp.Radio = new PubsRadio()
PubsApp.Router = new PubsRouter({controller: PubsApp.Radio})

export {PubsApp}

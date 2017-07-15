import * as Show from './show/show_controller'
import * as New from './new/new_controller'
import * as Details from './details/details_controller'
import {gc} from '../radio'

var PubsApp = {}
PubsApp.Show = Show
PubsApp.New = New

console.log(PubsApp)

var PubsRadio = Marionette.Object.extend({
  channelName: 'gc',
  radioRequests: {
    'publications/:id': 'showPub',
    'new:pub': 'newPub',
  },

  listPubs: function(criterion) {
    List.Controller.listPubs(criterion)
    Platform.execute('set:active:header', 'publications')
  },

  showPub: function(id) {
    Show.Controller.showPub(id)
    Platform.navigate('publications/' + id)
  },

  editPubDetails: function(id) {
    Details.Controller.editPubDetails(id)
  },

  userListPubs: function() {
    UserList.Controller.userListPubs()
  },

  newPub: function() {

    New.Controller.newPub()
  }})

PubsApp.Radio = new PubsRadio()

export {PubsApp}

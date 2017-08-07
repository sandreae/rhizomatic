import editSidebarPicker from './helpers/edit_sidebar_picker'
import editViewPicker from './helpers/edit_view_picker'
import {gc} from '../../radio'

var Controller = {
  editPub: function (id) {
    var fetchingpub = gc.request('pub:get', id)
    $.when(fetchingpub).done(function(pub){
      var type = pub.get('type')
      var editPubContentView = editViewPicker(pub, type)
      Platform.Regions.getRegion('main').show(editPubContentView)
    })
  },

  editPubSidebar: function (id) {
    var fetchingpub = gc.request('pub:get', id)
    $.when(fetchingpub).done(function(pub){
      var type = pub.get('type')
      var editSidebarView = editSidebarPicker(pub, type)

      editSidebarView.on('form:submit', function (content, data, pubModel) {
        var newDraft = new Platform.Entities.Pubs.Draft()

        if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
        if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        draft.set({content: content})

        pubModel.set({
          activeContent: content,
        })

        if (data.type !== type) {
          console.log('pubtype does not match')
          newDraft.set({
            type: data.type,
            pub: pubModel.get('_id')
          })
          drafts.add(newDraft)
        }

        if (pubModel.save(data)) {
          if (pubModel.get('type') === type) {
            Controller.newInvitedPub(pubModel)
            gc.trigger('user:home')
            gc.trigger('pubs:list')
            gc.trigger('sidebar:close')
          } else {
            gc.trigger('pub:content:edit', pubModel.get('_id'))
          }
          if (pubModel.get('published') === true) {gc.trigger('sidebar:close')}
        } else {
          editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError);
          pubModel.set({published: false})
          pubModel.save()
        }
      })
      gc.trigger('sidebar:show', editSidebarView)
    })
  },

  newInvitedPub: function (model) {
    var invitedUsers = model.get('directedAt')
    var fetchingUsers = gc.request('users:get')
    $.when(fetchingUsers).done(function (users) {
      invitedUsers.forEach(function (userName) {
        if (userName.includes('@')) {console.log(userName)}
        var invitedUserModels = users.where({userName: userName})
        invitedUserModels.forEach(function (userModel) {
          var userId = userModel.get('_id')
          var newPub = new Platform.Entities.Pubs.PubModel({
            contributorId: userId,
            invitedBy: model.get('contributorId'),
            inRhizome: model.get('memberOf')
          })
          newPub.save(null, {
            success: function () {
              console.log('newPub created for ' + userName)
            }
          })
        })
      })
    })
  }
}
export {Controller}

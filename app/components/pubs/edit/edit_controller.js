import editSidebarPicker from './helpers/edit_sidebar_picker'
import editViewPicker from './helpers/edit_view_picker'
import pubSave from './helpers/pubSave'
import {gc} from '../../radio'

var Controller = {
  editPub: function (id) {
    gc.request('pub:get', id).then(function(pub){
      var type = pub.get('type')
      var editPubContentView = editViewPicker(pub, type)
      Platform.Regions.getRegion('main').show(editPubContentView)
    })
  },

  editPubSidebar: function (id) {
    gc.request('pub:get', id).then(function(pub){
      var type = pub.get('type')
      var editSidebarView = editSidebarPicker(pub, type)

      editSidebarView.on('form:submit', function (content, data, pubModel) {

        var newDraft = new Platform.Entities.Pubs.Draft()
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        var isPublished = pubModel.get('published')
        var newType = data.type

        if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
        if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}

        draft.set({content: content})

        if (newType !== type) {
          newDraft.set({
            type: data.type,
            pub: pubModel.get('_id')
          })
          drafts.add(newDraft)
        }

        pubModel.set({
          activeContent: content,
        })

        pubSave(pubModel, data, newType, type, isPublished, Controller, gc)
        if (editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError) !== null){
          pubModel.set({published: false})
          pubModel.save(null, {
            success: function() {console.log('pub not published because of validation error')}
          })
        }
      })
      gc.trigger('sidebar:show', editSidebarView)
    })
  },

  newInvitedPub: function(pubModel) {
    console.log('newInvitedPub triggered')

    var invitedUsers = pubModel.get('directedAt')
    gc.request('users:get').then(function(users) {
      console.log('newInvitedPub got users')
      console.log(users)

      invitedUsers.forEach(function(contributor) {
        if (contributor.includes('@')) {console.log('send email to', contributor)}
        var invitedUserModel = users.findWhere({userName: contributor})
        var pendingList = invitedUserModel.get('pendingPub')
        pendingList.push({
          invitedByContrib: pubModel.get('contributor'),
          invitedByContribId: pubModel.get('contributorId'),
          invitedByPub: pubModel.get('title'),
          invitedByPubId: pubModel.get('_id')
        })
        invitedUserModel.set({
          pendingPub: pendingList
        })
        console.log(invitedUserModel)
      })
    })
  },

  publish: function(pubModel) {
    console.log('publish triggered')
    Controller.saveContributorName(pubModel)
    Controller.newInvitedPub(pubModel)
    gc.trigger('sidebar:close')
  },

  saveContributorName: function(pubModel) {
    console.log('save contributor names triggered')
    var user = gc.request('user:getCurrentUser')
    var contributorName = pubModel.get('contributor')
    console.log(contributorName)
    var contributors = user.get('contributorNames')
    if (!contributors.includes(contributorName)){contributors.push(contributorName)}
    console.log(contributors)
    user.set({contributorNames: contributors})
    user.save()
  },
}
export {Controller}

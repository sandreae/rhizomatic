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

        if (!pubModel.save(data)) {
          editSidebarView.triggerMethod('form:data:invalid', pubModel.validationError)
          pubModel.set({published: false})
          pubModel.save(null, {
            success: function() {console.log('pub not published because of validation error')}
          })
        } else {
          Controller.saveContributorName(pubModel)
          if (newType === type) {
            gc.trigger('user:home')
            gc.trigger('pubs:list')
            gc.trigger('sidebar:close')
          } else {
            gc.trigger('pub:content:edit', pubModel.get('_id'))
          }
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
    //Controller.newInvitedPub(pubModel)
    gc.trigger('sidebar:close')
  },

  saveContributorName: function(pubModel) {
    console.log('save contributor names triggered')
    gc.request('user:get', window.localStorage.userId).then(function(user) {
      console.log(user)
      var contributorName = pubModel.get('contributor')
      console.log(contributorName)
      var contributors = user.get('contributorNames')
      if (!contributors.includes(contributorName)){contributors.push(contributorName)}
      contributors = _.flatten(contributors)
      console.log(contributors)
      user.set({contributorNames: contributors})
      user.save(null, {
        success: function() {console.log('user saved with new contributor names')}
      })
      console.log(user)
    })
  },
}
export {Controller}

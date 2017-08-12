import editSidebarPicker from './helpers/edit_sidebar_picker'
import editViewPicker from './helpers/edit_view_picker'
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

        var newType = data.type
        var newDraft = new Platform.Entities.Pubs.Draft()
        var drafts = pubModel.get('drafts')
        var draft = drafts.findWhere({type: type})
        var nextDraft = drafts.findWhere({type: newType})
        console.log(drafts)
        console.log(nextDraft)

        if (data.tags === '') {data.tags = []} else {data.tags = data.tags.split(', ')}
        if (data.directedAt === '') {data.directedAt = []} else {data.directedAt = data.directedAt.split(', ')}

        if (nextDraft === undefined) {
          console.log('newDraft triggered')
          Controller.newDraft(pubModel, newDraft, drafts, newType)
        } else {
          console.log('changeDraft triggered')
          if (type !== newType) {
            Controller.changeDraft(pubModel, nextDraft, newType)
          } else {
            console.log('saveDraft triggered')
            Controller.saveDraft(editSidebarView, pubModel, content, draft, data)
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
      gc.request('pubs:get').then(function(pubs) {

        invitedUsers.forEach(function(contributor) {
          var invitedUserModel

          if (contributor.includes('@')) {
            console.log('send email to', contributor)
            invitedUserModel = new Platform.Entities.Users.User({
              userName: contributor,
              email: contributor,
              password: 'password'
            })
          } else {
            invitedUserModel = users.findWhere(function(model){
              return ( _.indexOf(model.get('contributorNames'), contributor) >= 0 );
            });
          }
          console.log(contributor)

          console.log(invitedUserModel)
          var pendingList = invitedUserModel.get('pendingPub')
          console.log(pendingList)

          pendingList.push({
            invitedByContrib: pubModel.get('contributor'),
            invitedByContribId: pubModel.get('contributorId'),
            invitedByPub: pubModel.get('title'),
            invitedByPubId: pubModel.get('_id')
          })
          invitedUserModel.set({
            pendingPub: pendingList
          })
          invitedUserModel.save()
          console.log(invitedUserModel)
        })
      })
    })
  },

  publish: function(pubModel) {
    Controller.saveContributorName(pubModel)
    Controller.newInvitedPub(pubModel)
    gc.trigger('sidebar:close')
  },

  saveContributorName: function(pubModel) {
    gc.request('user:get', window.localStorage.userId).then(function(user) {
      var contributorName = pubModel.get('contributor')
      var contributors = user.get('contributorNames')
      if (!contributors.includes(contributorName)){contributors.push(contributorName)}
      contributors = _.flatten(contributors)
      user.set({contributorNames: contributors})
      user.save(null, {
        success: function() {console.log('user saved with new contributor names')}
      })
      console.log(user)
    })
  },

  newDraft: function(pubModel, newDraft, drafts, newType) {
    newDraft.set({
      type: newType,
      pub: pubModel.get('_id')
    })
    if (newType === 'audio' || newType === 'image') {
      newDraft.set({content: []})
      pubModel.set({activeContent: []})
    } else {
      newDraft.set({content: ''})
      pubModel.set({activeContent: ''})
    }
    drafts.add(newDraft)
    pubModel.set({
      drafts: drafts,
      type: newType,
      activeContent: '',
    })
    pubModel.save(null)
    gc.trigger('pub:content:edit', pubModel.get('_id'))
  },

  saveDraft: function(editSidebarView, pubModel, content, draft, data) {
    draft.set({content: content})
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
      if (pubModel.get('published') === true){
        Controller.publish(pubModel)
      }
      gc.trigger('pubs:list')
      gc.trigger('sidebar:close')
    }
  },

  changeDraft: function(pubModel, nextDraft, newType) {
    var nextContent = nextDraft.get('content')
    pubModel.set({
      type: newType,
      activeContent: nextContent,
    })
    pubModel.save(null)
    gc.trigger('pub:content:edit', pubModel.get('_id'))
  }
}
export {Controller}
